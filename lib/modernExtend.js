"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pressure = exports.batteryPercentage = exports.co2 = exports.humidity = exports.temperature = exports.ota = exports.deviceEndpoints = exports.forceDeviceType = exports.customTimeResponse = exports.reconfigureReportingsOnDeviceAnnounce = exports.quirkCheckinInterval = exports.quirkAddEndpointCluster = exports.forcePowerSource = exports.actionEnumLookup = exports.binary = exports.numeric = exports.enumLookup = exports.lock = exports.light = exports.electricityMeter = exports.onOff = exports.identify = exports.setupConfigureForReporting = void 0;
const zigbee_herdsman_1 = require("zigbee-herdsman");
const toZigbee_1 = __importDefault(require("../converters/toZigbee"));
const fromZigbee_1 = __importDefault(require("../converters/fromZigbee"));
const exposes_1 = require("./exposes");
const light_1 = require("./light");
const utils_1 = require("./utils");
function getEndpointsWithInputCluster(device, cluster) {
    if (!device.endpoints) {
        throw new Error(device.ieeeAddr + ' ' + device.endpoints);
    }
    const endpoints = device.endpoints.filter((ep) => ep.getInputClusters().find((c) => (0, utils_1.isNumber)(cluster) ? c.ID === cluster : c.name === cluster));
    if (endpoints.length === 0) {
        throw new Error(`Device ${device.ieeeAddr} has no input cluster ${cluster}`);
    }
    return endpoints;
}
const timeLookup = {
    'MAX': 65000,
    '1_HOUR': 3600,
    '30_MINUTES': 1800,
    '10_SECONDS': 10,
};
function convertReportingConfigTime(time) {
    if ((0, utils_1.isString)(time)) {
        if (!(time in timeLookup))
            throw new Error(`Reporting time '${time}' is unknown`);
        return timeLookup[time];
    }
    else {
        return time;
    }
}
async function setupAttributes(entity, coordinatorEndpoint, cluster, config, logger, configureReporting = true, read = true) {
    const endpoints = (0, utils_1.isEndpoint)(entity) ? [entity] : getEndpointsWithInputCluster(entity, cluster);
    const ieeeAddr = (0, utils_1.isEndpoint)(entity) ? entity.deviceIeeeAddress : entity.ieeeAddr;
    for (const endpoint of endpoints) {
        logger.debug(`Configure reporting: ${configureReporting}, read: ${read} for ${ieeeAddr}/${endpoint.ID} ${cluster} ${JSON.stringify(config)}`);
        if (configureReporting) {
            await endpoint.bind(cluster, coordinatorEndpoint);
            await endpoint.configureReporting(cluster, config.map((a) => ({
                minimumReportInterval: convertReportingConfigTime(a.min),
                maximumReportInterval: convertReportingConfigTime(a.max),
                reportableChange: a.change,
                attribute: a.attribute,
            })));
        }
        if (read) {
            await endpoint.read(cluster, config.map((a) => (0, utils_1.isString)(a) ? a : ((0, utils_1.isObject)(a.attribute) ? a.attribute.ID : a.attribute)));
        }
    }
}
function setupConfigureForReporting(cluster, attribute, config, access, endpoints) {
    const configureReporting = !!config;
    const read = !!(access & exposes_1.access.GET);
    if (configureReporting || read) {
        const configure = async (device, coordinatorEndpoint, logger) => {
            const reportConfig = config ? { ...config, attribute: attribute } : { attribute, min: -1, max: -1, change: -1 };
            let entities = [device];
            if (endpoints) {
                const endpointsMap = new Map(endpoints.map((e) => [e, true]));
                entities = device.endpoints.filter((e) => endpointsMap.has(e.ID.toString()));
            }
            for (const entity of entities) {
                await setupAttributes(entity, coordinatorEndpoint, cluster, [reportConfig], logger, configureReporting, read);
            }
        };
        return configure;
    }
    else {
        return undefined;
    }
}
exports.setupConfigureForReporting = setupConfigureForReporting;
function identify() {
    return {
        toZigbee: [toZigbee_1.default.identify],
        isModernExtend: true,
    };
}
exports.identify = identify;
function onOff(args) {
    args = { powerOnBehavior: true, skipDuplicateTransaction: false, configureReporting: true, ...args };
    const exposes = args.endpoints ? Object.keys(args.endpoints).map((ep) => exposes_1.presets.switch().withEndpoint(ep)) : [exposes_1.presets.switch()];
    const fromZigbee = [(args.skipDuplicateTransaction ? fromZigbee_1.default.on_off_skip_duplicate_transaction : fromZigbee_1.default.on_off)];
    const toZigbee = [toZigbee_1.default.on_off];
    if (args.powerOnBehavior) {
        exposes.push(exposes_1.presets.power_on_behavior(['off', 'on', 'toggle', 'previous']));
        fromZigbee.push(fromZigbee_1.default.power_on_behavior);
        toZigbee.push(toZigbee_1.default.power_on_behavior);
    }
    const result = { exposes, fromZigbee, toZigbee, isModernExtend: true };
    if (args.ota)
        result.ota = args.ota;
    if (args.endpoints) {
        result.meta = { multiEndpoint: true };
        result.endpoint = (d) => args.endpoints;
    }
    if (args.configureReporting) {
        result.configure = async (device, coordinatorEndpoint, logger) => {
            await setupAttributes(device, coordinatorEndpoint, 'genOnOff', [{ attribute: 'onOff', min: 0, max: 'MAX', change: 1 }], logger);
            if (args.powerOnBehavior) {
                try {
                    // Don't fail configure if reading this attribute fails, some devices don't support it.
                    await setupAttributes(device, coordinatorEndpoint, 'genOnOff', [{ attribute: 'startUpOnOff', min: 0, max: 'MAX', change: 1 }], logger, false);
                }
                catch (e) {
                    if (e.message.includes('UNSUPPORTED_ATTRIBUTE')) {
                        logger.debug('Reading startUpOnOff failed, this features is unsupported');
                    }
                    else {
                        throw e;
                    }
                }
            }
        };
    }
    return result;
}
exports.onOff = onOff;
function electricityMeter(args) {
    args = { cluster: 'both', ...args };
    if (args.cluster === 'metering' && (0, utils_1.isObject)(args.power) && (0, utils_1.isObject)(args.energy) &&
        (args.power?.divisor !== args.energy?.divisor || args.power?.multiplier !== args.energy?.multiplier)) {
        throw new Error(`When cluster is metering, power and energy divisor/multiplier should be equal`);
    }
    let exposes;
    let fromZigbee;
    let toZigbee;
    const configureLookup = {
        haElectricalMeasurement: {
            // Report change with every 5W change
            power: { attribute: 'activePower', divisor: 'acPowerDivisor', multiplier: 'acPowerMultiplier', forced: args.power, change: 5 },
            // Report change with every 0.05A change
            current: { attribute: 'rmsCurrent', divisor: 'acCurrentDivisor', multiplier: 'acCurrentMultiplier', forced: args.current, change: 0.05 },
            // Report change with every 5V change
            voltage: { attribute: 'rmsVoltage', divisor: 'acVoltageDivisor', multiplier: 'acVoltageMultiplier', forced: args.voltage, change: 5 },
        },
        seMetering: {
            // Report change with every 5W change
            power: { attribute: 'instantaneousDemand', divisor: 'divisor', multiplier: 'multiplier', forced: args.power, change: 5 },
            // Report change with every 0.1kWh change
            energy: { attribute: 'currentSummDelivered', divisor: 'divisor', multiplier: 'multiplier', forced: args.energy, change: 0.1 },
        },
    };
    if (args.power === false) {
        delete configureLookup.haElectricalMeasurement.power;
        delete configureLookup.seMetering.power;
    }
    if (args.voltage === false)
        delete configureLookup.haElectricalMeasurement.voltage;
    if (args.current === false)
        delete configureLookup.haElectricalMeasurement.current;
    if (args.energy === false)
        delete configureLookup.seMetering.energy;
    if (args.cluster === 'both') {
        exposes = [
            exposes_1.presets.power().withAccess(exposes_1.access.STATE_GET), exposes_1.presets.voltage().withAccess(exposes_1.access.STATE_GET),
            exposes_1.presets.current().withAccess(exposes_1.access.STATE_GET), exposes_1.presets.energy().withAccess(exposes_1.access.STATE_GET),
        ];
        fromZigbee = [fromZigbee_1.default.electrical_measurement, fromZigbee_1.default.metering];
        toZigbee = [toZigbee_1.default.electrical_measurement_power, toZigbee_1.default.acvoltage, toZigbee_1.default.accurrent, toZigbee_1.default.currentsummdelivered];
        delete configureLookup.seMetering.power;
    }
    else if (args.cluster === 'metering') {
        exposes = [exposes_1.presets.power().withAccess(exposes_1.access.STATE_GET), exposes_1.presets.energy().withAccess(exposes_1.access.STATE_GET)];
        fromZigbee = [fromZigbee_1.default.metering];
        toZigbee = [toZigbee_1.default.metering_power, toZigbee_1.default.currentsummdelivered];
        delete configureLookup.haElectricalMeasurement;
    }
    else if (args.cluster === 'electrical') {
        exposes = [exposes_1.presets.power().withAccess(exposes_1.access.STATE_GET), exposes_1.presets.voltage().withAccess(exposes_1.access.STATE_GET), exposes_1.presets.current().withAccess(exposes_1.access.STATE_GET)];
        fromZigbee = [fromZigbee_1.default.electrical_measurement];
        toZigbee = [toZigbee_1.default.electrical_measurement_power, toZigbee_1.default.acvoltage, toZigbee_1.default.accurrent];
        delete configureLookup.seMetering;
    }
    const configure = async (device, coordinatorEndpoint, logger) => {
        for (const [cluster, properties] of Object.entries(configureLookup)) {
            for (const endpoint of getEndpointsWithInputCluster(device, cluster)) {
                const items = [];
                for (const property of Object.values(properties)) {
                    // In case multiplier or divisor was provided, use that instead of reading from device.
                    if (property.forced) {
                        endpoint.saveClusterAttributeKeyValue(cluster, {
                            [property.divisor]: property.forced.divisor ?? 1,
                            [property.multiplier]: property.forced.multiplier ?? 1,
                        });
                        endpoint.save();
                    }
                    else {
                        await endpoint.read(cluster, [property.divisor, property.multiplier]);
                    }
                    const divisor = endpoint.getClusterAttributeValue(cluster, property.divisor);
                    (0, utils_1.assertNumber)(divisor, property.divisor);
                    const multiplier = endpoint.getClusterAttributeValue(cluster, property.multiplier);
                    (0, utils_1.assertNumber)(multiplier, property.multiplier);
                    let change = property.change * (divisor / multiplier);
                    // currentSummDelivered data type is uint48, so reportableChange also is uint48
                    if (property.attribute === 'currentSummDelivered')
                        change = [0, change];
                    items.push({ attribute: property.attribute, min: '10_SECONDS', max: 'MAX', change });
                }
                if (items.length) {
                    await setupAttributes(endpoint, coordinatorEndpoint, cluster, items, logger);
                }
            }
        }
    };
    return { exposes, fromZigbee, toZigbee, configure, isModernExtend: true };
}
exports.electricityMeter = electricityMeter;
function light(args) {
    args = { effect: true, powerOnBehavior: true, configureReporting: false, ...args };
    if (args.colorTemp) {
        args.colorTemp = { startup: true, ...args.colorTemp };
    }
    const argsColor = args.color ? {
        modes: ['xy'], applyRedFix: false, enhancedHue: true, ...((0, utils_1.isObject)(args.color) ? args.color : {}),
    } : false;
    const lightExpose = args.endpoints ? Object.keys(args.endpoints).map((_) => exposes_1.presets.light().withBrightness()) : [exposes_1.presets.light().withBrightness()];
    const fromZigbee = [fromZigbee_1.default.on_off, fromZigbee_1.default.brightness, fromZigbee_1.default.ignore_basic_report, fromZigbee_1.default.level_config];
    const toZigbee = [
        toZigbee_1.default.light_onoff_brightness, toZigbee_1.default.ignore_transition, toZigbee_1.default.level_config, toZigbee_1.default.ignore_rate, toZigbee_1.default.light_brightness_move, toZigbee_1.default.light_brightness_step,
    ];
    const meta = {};
    if (args.colorTemp || argsColor) {
        fromZigbee.push(fromZigbee_1.default.color_colortemp);
        if (args.colorTemp && argsColor)
            toZigbee.push(toZigbee_1.default.light_color_colortemp);
        else if (args.colorTemp)
            toZigbee.push(toZigbee_1.default.light_colortemp);
        else if (argsColor)
            toZigbee.push(toZigbee_1.default.light_color);
        toZigbee.push(toZigbee_1.default.light_color_mode, toZigbee_1.default.light_color_options);
    }
    if (args.colorTemp) {
        lightExpose.forEach((e) => e.withColorTemp(args.colorTemp.range));
        toZigbee.push(toZigbee_1.default.light_colortemp_move, toZigbee_1.default.light_colortemp_step);
        if (args.colorTemp.startup) {
            toZigbee.push(toZigbee_1.default.light_colortemp_startup);
            lightExpose.forEach((e) => e.withColorTempStartup(args.colorTemp.range));
        }
    }
    if (argsColor) {
        lightExpose.forEach((e) => e.withColor(argsColor.modes));
        toZigbee.push(toZigbee_1.default.light_hue_saturation_move, toZigbee_1.default.light_hue_saturation_step);
        if (argsColor.modes.includes('hs')) {
            meta.supportsHueAndSaturation = true;
        }
        if (argsColor.applyRedFix) {
            meta.applyRedFix = true;
        }
        if (!argsColor.enhancedHue) {
            meta.supportsEnhancedHue = false;
        }
    }
    if (args.endpoints) {
        Object.keys(args.endpoints).forEach((ep, idx) => lightExpose[idx].withEndpoint(ep));
        meta.multiEndpoint = true;
    }
    const exposes = lightExpose;
    if (args.effect) {
        exposes.push(exposes_1.presets.effect());
        toZigbee.push(toZigbee_1.default.effect);
    }
    if (args.powerOnBehavior) {
        exposes.push(exposes_1.presets.power_on_behavior(['off', 'on', 'toggle', 'previous']));
        fromZigbee.push(fromZigbee_1.default.power_on_behavior);
        toZigbee.push(toZigbee_1.default.power_on_behavior);
    }
    if (args.hasOwnProperty('turnsOffAtBrightness1')) {
        meta.turnsOffAtBrightness1 = args.turnsOffAtBrightness1;
    }
    const configure = async (device, coordinatorEndpoint, logger) => {
        await (0, light_1.configure)(device, coordinatorEndpoint, logger, true);
        if (args.configureReporting) {
            await setupAttributes(device, coordinatorEndpoint, 'genOnOff', [{ attribute: 'onOff', min: 0, max: 'MAX', change: 1 }], logger);
            await setupAttributes(device, coordinatorEndpoint, 'genLevelCtrl', [{ attribute: 'currentLevel', min: '10_SECONDS', max: 'MAX', change: 1 }], logger);
            if (args.colorTemp) {
                await setupAttributes(device, coordinatorEndpoint, 'lightingColorCtrl', [{ attribute: 'colorTemperature', min: '10_SECONDS', max: 'MAX', change: 1 }], logger);
            }
            if (argsColor) {
                const attributes = [];
                if (argsColor.modes.includes('xy')) {
                    attributes.push({ attribute: 'currentX', min: '10_SECONDS', max: 'MAX', change: 1 }, { attribute: 'currentY', min: '10_SECONDS', max: 'MAX', change: 1 });
                }
                if (argsColor.modes.includes('hs')) {
                    attributes.push({ attribute: argsColor.enhancedHue ? 'enhancedCurrentHue' : 'currentHue', min: '10_SECONDS', max: 'MAX', change: 1 }, { attribute: 'currentSaturation', min: '10_SECONDS', max: 'MAX', change: 1 });
                }
                await setupAttributes(device, coordinatorEndpoint, 'lightingColorCtrl', attributes, logger);
            }
        }
    };
    const result = { exposes, fromZigbee, toZigbee, configure, meta, isModernExtend: true };
    if (args.endpoints)
        result.endpoint = (d) => args.endpoints;
    if (args.ota)
        result.ota = args.ota;
    return result;
}
exports.light = light;
function lock(args) {
    args = { ...args };
    const fromZigbee = [fromZigbee_1.default.lock, fromZigbee_1.default.lock_operation_event, fromZigbee_1.default.lock_programming_event, fromZigbee_1.default.lock_pin_code_response,
        fromZigbee_1.default.lock_user_status_response];
    const toZigbee = [toZigbee_1.default.lock, toZigbee_1.default.pincode_lock, toZigbee_1.default.lock_userstatus, toZigbee_1.default.lock_auto_relock_time, toZigbee_1.default.lock_sound_volume];
    const exposes = [exposes_1.presets.lock(), exposes_1.presets.pincode(), exposes_1.presets.lock_action(), exposes_1.presets.lock_action_source_name(), exposes_1.presets.lock_action_user(),
        exposes_1.presets.auto_relock_time().withValueMin(0).withValueMax(3600), exposes_1.presets.sound_volume()];
    const configure = async (device, coordinatorEndpoint, logger) => {
        await setupAttributes(device, coordinatorEndpoint, 'closuresDoorLock', [{ attribute: 'lockState', min: 0, max: '1_HOUR', change: 0 }], logger);
    };
    const meta = { pinCodeCount: args.pinCodeCount };
    return { fromZigbee, toZigbee, exposes, configure, meta, isModernExtend: true };
}
exports.lock = lock;
function enumLookup(args) {
    const { name, lookup, cluster, attribute, description, zigbeeCommandOptions, endpoint, reporting } = args;
    const attributeKey = (0, utils_1.isString)(attribute) ? attribute : attribute.ID;
    const access = exposes_1.access[args.access ?? 'ALL'];
    let expose = exposes_1.presets.enum(name, access, Object.keys(lookup)).withDescription(description);
    if (endpoint)
        expose = expose.withEndpoint(endpoint);
    const fromZigbee = [{
            cluster: cluster.toString(),
            type: ['attributeReport', 'readResponse'],
            convert: (model, msg, publish, options, meta) => {
                if (attributeKey in msg.data && (!endpoint || (0, utils_1.getEndpointName)(msg, model, meta) === endpoint)) {
                    return { [expose.property]: (0, utils_1.getFromLookupByValue)(msg.data[attributeKey], lookup) };
                }
            },
        }];
    const toZigbee = [{
            key: [name],
            convertSet: access & exposes_1.access.SET ? async (entity, key, value, meta) => {
                const payloadValue = (0, utils_1.getFromLookup)(value, lookup);
                const payload = (0, utils_1.isString)(attribute) ? { [attribute]: payloadValue } : { [attribute.ID]: { value: payloadValue, type: attribute.type } };
                await entity.write(cluster, payload, zigbeeCommandOptions);
                return { state: { [key]: value } };
            } : undefined,
            convertGet: access & exposes_1.access.GET ? async (entity, key, meta) => {
                await entity.read(cluster, [attributeKey], zigbeeCommandOptions);
            } : undefined,
        }];
    const configure = setupConfigureForReporting(cluster, attribute, reporting, access);
    return { exposes: [expose], fromZigbee, toZigbee, configure, isModernExtend: true };
}
exports.enumLookup = enumLookup;
function numeric(args) {
    const { name, cluster, attribute, description, zigbeeCommandOptions, unit, reporting, valueMin, valueMax, valueStep, scale, label, } = args;
    let endpoints = args.endpoints;
    if (!endpoints && args.endpoint) {
        endpoints = [args.endpoint];
    }
    const attributeKey = (0, utils_1.isString)(attribute) ? attribute : attribute.ID;
    const access = exposes_1.access[args.access ?? 'ALL'];
    const exposes = [];
    const createExpose = (endpoint) => {
        let expose = exposes_1.presets.numeric(name, access).withDescription(description);
        if (endpoint)
            expose = expose.withEndpoint(endpoint);
        if (unit)
            expose = expose.withUnit(unit);
        if (valueMin !== undefined)
            expose = expose.withValueMin(valueMin);
        if (valueMax !== undefined)
            expose = expose.withValueMax(valueMax);
        if (valueStep !== undefined)
            expose = expose.withValueStep(valueStep);
        if (label !== undefined)
            expose = expose.withLabel(label);
        return expose;
    };
    // Generate for multiple endpoints only if required
    const noEndpoint = !endpoints || (endpoints && endpoints.length === 1 && endpoints[0] === '1');
    if (noEndpoint) {
        exposes.push(createExpose(undefined));
    }
    else {
        for (const endpoint of endpoints) {
            exposes.push(createExpose(endpoint));
        }
    }
    const fromZigbee = [{
            cluster: cluster.toString(),
            type: ['attributeReport', 'readResponse'],
            convert: (model, msg, publish, options, meta) => {
                if (attributeKey in msg.data) {
                    const endpoint = endpoints?.find((e) => (0, utils_1.getEndpointName)(msg, model, meta) === e);
                    if (endpoints && !endpoint) {
                        return;
                    }
                    let value = msg.data[attributeKey];
                    (0, utils_1.assertNumber)(value);
                    if (scale !== undefined)
                        value = value / scale;
                    const expose = exposes.length === 1 ? exposes[0] : exposes.find((e) => e.endpoint === endpoint);
                    return { [expose.property]: value };
                }
            },
        }];
    const toZigbee = [{
            key: [name],
            convertSet: access & exposes_1.access.SET ? async (entity, key, value, meta) => {
                (0, utils_1.assertNumber)(value, key);
                const payloadValue = scale === undefined ? value : value * scale;
                const payload = (0, utils_1.isString)(attribute) ? { [attribute]: payloadValue } : { [attribute.ID]: { value: payloadValue, type: attribute.type } };
                await entity.write(cluster, payload, zigbeeCommandOptions);
                return { state: { [key]: value } };
            } : undefined,
            convertGet: access & exposes_1.access.GET ? async (entity, key, meta) => {
                await entity.read(cluster, [attributeKey], zigbeeCommandOptions);
            } : undefined,
        }];
    const configure = setupConfigureForReporting(cluster, attribute, reporting, access, endpoints);
    return { exposes, fromZigbee, toZigbee, configure, isModernExtend: true };
}
exports.numeric = numeric;
function binary(args) {
    const { name, valueOn, valueOff, cluster, attribute, description, zigbeeCommandOptions, endpoint, reporting } = args;
    const attributeKey = (0, utils_1.isString)(attribute) ? attribute : attribute.ID;
    const access = exposes_1.access[args.access ?? 'ALL'];
    let expose = exposes_1.presets.binary(name, access, valueOn[0], valueOff[0]).withDescription(description);
    if (endpoint)
        expose = expose.withEndpoint(endpoint);
    const fromZigbee = [{
            cluster: cluster.toString(),
            type: ['attributeReport', 'readResponse'],
            convert: (model, msg, publish, options, meta) => {
                if (attributeKey in msg.data && (!endpoint || (0, utils_1.getEndpointName)(msg, model, meta) === endpoint)) {
                    return { [expose.property]: msg.data[attributeKey] === valueOn[1] ? valueOn[0] : valueOff[0] };
                }
            },
        }];
    const toZigbee = [{
            key: [name],
            convertSet: access & exposes_1.access.SET ? async (entity, key, value, meta) => {
                const payloadValue = value === valueOn[0] ? valueOn[1] : valueOff[1];
                const payload = (0, utils_1.isString)(attribute) ? { [attribute]: payloadValue } : { [attribute.ID]: { value: payloadValue, type: attribute.type } };
                await entity.write(cluster, payload, zigbeeCommandOptions);
                return { state: { [key]: value } };
            } : undefined,
            convertGet: access & exposes_1.access.GET ? async (entity, key, meta) => {
                await entity.read(cluster, [attributeKey], zigbeeCommandOptions);
            } : undefined,
        }];
    const configure = setupConfigureForReporting(cluster, attribute, reporting, access);
    return { exposes: [expose], fromZigbee, toZigbee, configure, isModernExtend: true };
}
exports.binary = binary;
function actionEnumLookup(args) {
    const { lookup, attribute, cluster } = args;
    const attributeKey = (0, utils_1.isString)(attribute) ? attribute : attribute.ID;
    const actions = Object.keys(lookup).map((a) => args.endpointNames ? args.endpointNames.map((e) => `${a}_${e}`) : [a]).flat();
    const expose = exposes_1.presets.enum('action', exposes_1.access.STATE, actions).withDescription('Triggered action (e.g. a button click)');
    const fromZigbee = [{
            cluster: cluster.toString(),
            type: ['attributeReport', 'readResponse'],
            convert: (model, msg, publish, options, meta) => {
                if (attributeKey in msg.data) {
                    let value = (0, utils_1.getFromLookupByValue)(msg.data[attributeKey], lookup);
                    if (args.endpointNames)
                        value = (0, utils_1.postfixWithEndpointName)(value, msg, model, meta);
                    return { [expose.property]: value };
                }
            },
        }];
    return { exposes: [expose], fromZigbee, isModernExtend: true };
}
exports.actionEnumLookup = actionEnumLookup;
function forcePowerSource(args) {
    const configure = async (device, coordinatorEndpoint, logger) => {
        device.powerSource = args.powerSource;
        device.save();
    };
    return { configure, isModernExtend: true };
}
exports.forcePowerSource = forcePowerSource;
function quirkAddEndpointCluster(args) {
    const { endpointID, inputClusters, outputClusters } = args;
    const configure = async (device, coordinatorEndpoint, logger) => {
        const endpoint = device.getEndpoint(endpointID);
        if (endpoint == undefined) {
            logger.error(`Quirk: cannot add clusters to endpoint ${endpointID}, endpoint does not exist!`);
            return;
        }
        inputClusters?.forEach((cluster) => {
            const clusterID = (0, utils_1.isString)(cluster) ?
                zigbee_herdsman_1.Zcl.Utils.getCluster(cluster, device.manufacturerID).ID :
                cluster;
            if (!endpoint.inputClusters.includes(clusterID)) {
                logger.debug(`Quirk: adding input cluster ${clusterID} to endpoint ${endpointID}.`);
                endpoint.inputClusters.push(clusterID);
            }
        });
        outputClusters?.forEach((cluster) => {
            const clusterID = (0, utils_1.isString)(cluster) ?
                zigbee_herdsman_1.Zcl.Utils.getCluster(cluster, device.manufacturerID).ID :
                cluster;
            if (!endpoint.outputClusters.includes(clusterID)) {
                logger.debug(`Quirk: adding output cluster ${clusterID} to endpoint ${endpointID}.`);
                endpoint.outputClusters.push(clusterID);
            }
        });
        device.save();
    };
    return { configure, isModernExtend: true };
}
exports.quirkAddEndpointCluster = quirkAddEndpointCluster;
function quirkCheckinInterval(timeout) {
    const configure = async (device, coordinatorEndpoint, logger) => {
        device.checkinInterval = (typeof timeout == 'number') ? timeout : timeLookup[timeout];
        device.save();
    };
    return { configure, isModernExtend: true };
}
exports.quirkCheckinInterval = quirkCheckinInterval;
function reconfigureReportingsOnDeviceAnnounce() {
    const onEvent = async (type, data, device, options, state) => {
        if (type === 'deviceAnnounce') {
            for (const endpoint of device.endpoints) {
                for (const c of endpoint.configuredReportings) {
                    await endpoint.configureReporting(c.cluster.name, [{
                            attribute: c.attribute.name, minimumReportInterval: c.minimumReportInterval,
                            maximumReportInterval: c.maximumReportInterval, reportableChange: c.reportableChange,
                        }]);
                }
            }
        }
    };
    return { onEvent, isModernExtend: true };
}
exports.reconfigureReportingsOnDeviceAnnounce = reconfigureReportingsOnDeviceAnnounce;
function customTimeResponse(start) {
    const onEvent = async (type, data, device, options, state) => {
        device.skipTimeResponse = true;
        // The Zigbee Cluster Library specification states that the genTime.time response should be the
        // number of seconds since 1st Jan 2000 00:00:00 UTC. This extend modifies that:
        // 1970_UTC: number of seconds since the Unix Epoch (1st Jan 1970 00:00:00 UTC)
        // 2000_LOCAL: seconds since 1 January in the local time zone.
        // Disable the responses of zigbee-herdsman and respond here instead.
        if (type === 'message' && data.type === 'read' && data.cluster === 'genTime') {
            const payload = {};
            if (start === '1970_UTC') {
                const time = Math.round(((new Date()).getTime()) / 1000);
                payload.time = time;
                payload.localTime = time - (new Date()).getTimezoneOffset() * 60;
            }
            else if (start === '2000_LOCAL') {
                const oneJanuary2000 = new Date('January 01, 2000 00:00:00 UTC+00:00').getTime();
                const secondsUTC = Math.round(((new Date()).getTime() - oneJanuary2000) / 1000);
                payload.time = secondsUTC - (new Date()).getTimezoneOffset() * 60;
            }
            data.endpoint.readResponse('genTime', data.meta.zclTransactionSequenceNumber, payload);
        }
    };
    return { onEvent, isModernExtend: true };
}
exports.customTimeResponse = customTimeResponse;
function forceDeviceType(args) {
    const configure = async (device, coordinatorEndpoint, logger) => {
        device.type = args.type;
        device.save();
    };
    return { configure, isModernExtend: true };
}
exports.forceDeviceType = forceDeviceType;
function deviceEndpoints(args) {
    return {
        endpoint: (d) => args.endpoints,
        isModernExtend: true,
    };
}
exports.deviceEndpoints = deviceEndpoints;
function ota(args) {
    return {
        ota: args.definition,
        isModernExtend: true,
    };
}
exports.ota = ota;
function temperature(args) {
    return numeric({
        name: 'temperature',
        cluster: 'msTemperatureMeasurement',
        attribute: 'measuredValue',
        reporting: { min: '10_SECONDS', max: '1_HOUR', change: 100 },
        description: 'Measured temperature value',
        unit: '°C',
        scale: 100,
        access: 'STATE_GET',
        ...args,
    });
}
exports.temperature = temperature;
function humidity(args) {
    return numeric({
        name: 'humidity',
        cluster: 'msRelativeHumidity',
        attribute: 'measuredValue',
        reporting: { min: '10_SECONDS', max: '1_HOUR', change: 100 },
        description: 'Measured relative humidity',
        unit: '%',
        scale: 100,
        access: 'STATE_GET',
        ...args,
    });
}
exports.humidity = humidity;
function co2(args) {
    return numeric({
        name: 'co2',
        cluster: 'msCO2',
        label: 'CO2',
        attribute: 'measuredValue',
        reporting: { min: '10_SECONDS', max: '1_HOUR', change: 0.00005 }, // 50 ppm change
        description: 'Measured value',
        unit: 'ppm',
        scale: 0.000001,
        access: 'STATE_GET',
        ...args,
    });
}
exports.co2 = co2;
function batteryPercentage(args) {
    return numeric({
        name: 'battery',
        cluster: 'genPowerCfg',
        attribute: 'batteryPercentageRemaining',
        reporting: { min: '1_HOUR', max: 'MAX', change: 10 },
        description: 'Remaining battery in %',
        unit: '%',
        scale: 2,
        access: 'STATE_GET',
        ...args,
    });
}
exports.batteryPercentage = batteryPercentage;
function pressure(args) {
    return numeric({
        name: 'pressure',
        cluster: 'msPressureMeasurement',
        attribute: 'measuredValue',
        reporting: { min: '10_SECONDS', max: '1_HOUR', change: 50 }, // 5 kPa
        description: 'The measured atmospheric pressure',
        unit: 'kPa',
        scale: 10,
        access: 'STATE_GET',
        ...args,
    });
}
exports.pressure = pressure;
//# sourceMappingURL=modernExtend.js.map