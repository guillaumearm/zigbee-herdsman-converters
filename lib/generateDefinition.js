"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDefinition = void 0;
const utils_1 = require("./utils");
const m = __importStar(require("./modernExtend"));
const zh = __importStar(require("zigbee-herdsman/dist"));
const philips_1 = require("./philips");
const logger_1 = require("./logger");
// Generator allows to define instances of GeneratedExtend that have typed arguments to extender.
class Generator {
    extend;
    args;
    source;
    lib;
    constructor(args) {
        this.extend = args.extend;
        this.args = args.args;
        this.source = args.source;
        this.lib = args.lib;
    }
    getExtend() {
        return this.extend(this.args);
    }
    getSource() {
        let jsonArgs = JSON.stringify(this.args);
        if (!this.args || jsonArgs === '{}') {
            jsonArgs = '';
        }
        return this.source + '(' + jsonArgs + ')';
    }
}
function generateSource(definition, generatedExtend) {
    const imports = {};
    const importsDeduplication = new Set();
    generatedExtend.forEach((e) => {
        const lib = e.lib ?? 'modernExtend';
        if (!(lib in imports))
            imports[lib] = [];
        const importName = e.getSource().split('(')[0];
        if (!importsDeduplication.has(importName)) {
            importsDeduplication.add(importName);
            imports[lib].push(importName);
        }
    });
    const importsStr = Object.entries(imports)
        .map((e) => `const {${e[1].join(', ')}} = require('zigbee-herdsman-converters/lib/${e[0]}');`).join('\n');
    return `${importsStr}

const definition = {
    zigbeeModel: ['${definition.zigbeeModel}'],
    model: '${definition.model}',
    vendor: '${definition.vendor}',
    description: 'Automatically generated definition',
    extend: [${generatedExtend.map((e) => e.getSource()).join(', ')}],
    meta: ${JSON.stringify(definition.meta || {})},
};

module.exports = definition;`;
}
async function generateDefinition(device) {
    // Map cluster to all endpoints that have this cluster.
    const mapClusters = (endpoint, clusters, clusterMap) => {
        for (const cluster of clusters) {
            if (!clusterMap.has(cluster.name)) {
                clusterMap.set(cluster.name, []);
            }
            const endpointsWithCluster = clusterMap.get(cluster.name);
            endpointsWithCluster.push(endpoint);
        }
    };
    const knownInputClusters = inputExtenders.map((ext) => ext[0]).flat(1);
    const knownOutputClusters = outputExtenders.map((ext) => ext[0]).flat(1);
    const inputClusterMap = new Map();
    const outputClusterMap = new Map();
    for (const endpoint of device.endpoints) {
        // Filter clusters to leave only the ones that we can generate extenders for.
        const inputClusters = endpoint.getInputClusters().filter((c) => knownInputClusters.find((known) => known === c.name));
        const outputClusters = endpoint.getOutputClusters().filter((c) => knownOutputClusters.find((known) => known === c.name));
        mapClusters(endpoint, inputClusters, inputClusterMap);
        mapClusters(endpoint, outputClusters, outputClusterMap);
    }
    // Generate extenders
    const multiEndpoint = Array.from(inputClusterMap.values()).some((e) => e.length > 1) ||
        Array.from(outputClusterMap.values()).some((e) => e.length > 1);
    const usedExtenders = [];
    const generatedExtend = [];
    // First of all add endpoint definitions if device is multiEndpoint.
    if (multiEndpoint) {
        const endpoints = {};
        // Add all endpoints, just to be safe.
        for (const endpoint of device.endpoints) {
            endpoints[endpoint.ID.toString()] = endpoint.ID;
        }
        generatedExtend.push(new Generator({ extend: m.deviceEndpoints, args: { endpoints }, source: 'deviceEndpoints' }));
    }
    const addGenerators = async (clusterName, endpoints, extenders) => {
        const extender = extenders.find((e) => e[0].includes(clusterName));
        if (!extender || usedExtenders.includes(extender)) {
            return;
        }
        usedExtenders.push(extender);
        generatedExtend.push(...(await extender[1](endpoints)));
    };
    for (const [cluster, endpoints] of inputClusterMap) {
        await addGenerators(cluster, endpoints, inputExtenders);
    }
    for (const [cluster, endpoints] of outputClusterMap) {
        await addGenerators(cluster, endpoints, outputExtenders);
    }
    const extenders = generatedExtend.map((e) => e.getExtend());
    // Generated definition below will provide this.
    extenders.forEach((extender) => {
        extender.endpoint = undefined;
    });
    const definition = {
        zigbeeModel: [device.modelID],
        model: device.modelID ?? '',
        vendor: device.manufacturerName ?? '',
        description: 'Automatically generated definition',
        extend: extenders,
        generated: true,
    };
    if (multiEndpoint) {
        definition.meta = { multiEndpoint };
    }
    const externalDefinitionSource = generateSource(definition, generatedExtend);
    return { externalDefinitionSource, definition };
}
exports.generateDefinition = generateDefinition;
function stringifyEps(endpoints) {
    return endpoints.map((e) => e.ID.toString());
}
const inputExtenders = [
    [['msTemperatureMeasurement'], async (eps) => [
            new Generator({ extend: m.temperature, args: { endpoints: stringifyEps(eps) }, source: 'temperature' }),
        ]],
    [['msPressureMeasurement'], async (eps) => [new Generator({ extend: m.pressure, args: { endpoints: stringifyEps(eps) }, source: 'pressure' })]],
    [['msRelativeHumidity'], async (eps) => [new Generator({ extend: m.humidity, args: { endpoints: stringifyEps(eps) }, source: 'humidity' })]],
    [['msCO2'], async (eps) => [new Generator({ extend: m.co2, args: { endpoints: stringifyEps(eps) }, source: 'co2' })]],
    [['genPowerCfg'], async () => [new Generator({ extend: m.batteryPercentage, source: 'batteryPercentage' })]],
    [['genOnOff', 'lightingColorCtrl'], extenderOnOffLight],
    [['seMetering', 'haElectricalMeasurement'], extenderElectricityMeter],
    [['closuresDoorLock'], extenderLock],
];
const outputExtenders = [
    [['genIdentify'], async () => [new Generator({ extend: m.identify, source: 'identify' })]],
];
async function extenderLock(endpoints) {
    // TODO: Support multiple endpoints
    if (endpoints.length > 1) {
        logger_1.logger.warn('extenderLock can accept only one endpoint');
    }
    const endpoint = endpoints[0];
    const pinCodeCount = await (0, utils_1.getClusterAttributeValue)(endpoint, 'closuresDoorLock', 'numOfPinUsersSupported', 50);
    return [new Generator({ extend: m.lock, args: { pinCodeCount }, source: `lock` })];
}
async function extenderOnOffLight(endpoints) {
    const generated = [];
    const lightEndpoints = endpoints.filter((e) => e.supportsInputCluster('lightingColorCtrl'));
    const onOffEndpoints = endpoints.filter((e) => lightEndpoints.findIndex((ep) => e.ID === ep.ID) === -1);
    if (onOffEndpoints.length !== 0) {
        const endpoints = onOffEndpoints.length > 1 ? onOffEndpoints.reduce((prev, curr) => {
            prev[curr.ID.toString()] = curr.ID;
            return prev;
        }, {}) : undefined;
        generated.push(new Generator({ extend: m.onOff, args: { powerOnBehavior: false, endpoints }, source: 'onOff' }));
    }
    for (const endpoint of lightEndpoints) {
        // In case read fails, support all features with 31
        const colorCapabilities = await (0, utils_1.getClusterAttributeValue)(endpoint, 'lightingColorCtrl', 'colorCapabilities', 31);
        const supportsHueSaturation = (colorCapabilities & 1 << 0) > 0;
        const supportsEnhancedHueSaturation = (colorCapabilities & 1 << 1) > 0;
        const supportsColorXY = (colorCapabilities & 1 << 3) > 0;
        const supportsColorTemperature = (colorCapabilities & 1 << 4) > 0;
        const args = {};
        if (supportsColorTemperature) {
            const minColorTemp = await (0, utils_1.getClusterAttributeValue)(endpoint, 'lightingColorCtrl', 'colorTempPhysicalMin', 150);
            const maxColorTemp = await (0, utils_1.getClusterAttributeValue)(endpoint, 'lightingColorCtrl', 'colorTempPhysicalMax', 500);
            args.colorTemp = { range: [minColorTemp, maxColorTemp] };
        }
        if (supportsColorXY) {
            args.color = true;
            if (supportsHueSaturation || supportsEnhancedHueSaturation) {
                args.color = {};
                if (supportsHueSaturation)
                    args.color.modes = ['xy', 'hs'];
                if (supportsEnhancedHueSaturation)
                    args.color.enhancedHue = true;
            }
        }
        if (endpoint.getDevice().manufacturerID === zh.Zcl.ManufacturerCode.Philips) {
            generated.push(new Generator({ extend: philips_1.philipsLight, args, source: `philipsLight`, lib: 'philips' }));
        }
        else {
            generated.push(new Generator({ extend: m.light, args, source: `light` }));
        }
    }
    return generated;
}
async function extenderElectricityMeter(endpoints) {
    // TODO: Support multiple endpoints
    if (endpoints.length > 1) {
        logger_1.logger.warn('extenderElectricityMeter can accept only one endpoint');
    }
    const endpoint = endpoints[0];
    const metering = endpoint.supportsInputCluster('seMetering');
    const electricalMeasurements = endpoint.supportsInputCluster('haElectricalMeasurement');
    const args = {};
    if (!metering || !electricalMeasurements) {
        args.cluster = metering ? 'metering' : 'electrical';
    }
    return [new Generator({ extend: m.electricityMeter, args, source: `electricityMeter` })];
}
//# sourceMappingURL=generateDefinition.js.map