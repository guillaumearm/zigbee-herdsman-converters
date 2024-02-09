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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fromZigbee_1 = __importDefault(require("../converters/fromZigbee"));
const exposes = __importStar(require("../lib/exposes"));
const reporting = __importStar(require("../lib/reporting"));
const extend_1 = __importDefault(require("../lib/extend"));
const modernExtend_1 = require("../lib/modernExtend");
const e = exposes.presets;
const definitions = [
    {
        zigbeeModel: ['SM308'],
        model: 'SM308',
        vendor: 'Samotech',
        description: 'Zigbee AC in wall switch',
        extend: [(0, modernExtend_1.onOff)()],
    },
    {
        zigbeeModel: ['SM308-S'],
        model: 'SM308-S',
        vendor: 'Samotech',
        description: 'Zigbee in wall smart switch',
        extend: [(0, modernExtend_1.onOff)()],
    },
    {
        zigbeeModel: ['SM308-2CH'],
        model: 'SM308-2CH',
        vendor: 'Samotech',
        description: 'Zigbee 2 channel in wall switch',
        extend: extend_1.default.switch({ fromZigbee: [fromZigbee_1.default.electrical_measurement, fromZigbee_1.default.metering] }),
        exposes: [
            e.switch().withEndpoint('l1'),
            e.switch().withEndpoint('l2'),
            e.power_on_behavior().withEndpoint('l1'),
            e.power_on_behavior().withEndpoint('l2'),
            e.power(), e.current(), e.voltage(), e.energy()
        ],
        endpoint: (device) => {
            return { 'l1': 1, 'l2': 2 };
        },
        meta: { multiEndpoint: true },
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint1 = device.getEndpoint(1);
            const endpoint2 = device.getEndpoint(2);
            const endpoint11 = device.getEndpoint(11);
            await reporting.bind(endpoint1, coordinatorEndpoint, ['genBasic', 'genIdentify', 'genOnOff']);
            await reporting.bind(endpoint2, coordinatorEndpoint, ['genBasic', 'genIdentify', 'genOnOff']);
            await reporting.bind(endpoint11, coordinatorEndpoint, ['genOta', 'haElectricalMeasurement', 'seMetering']);
            await reporting.readEletricalMeasurementMultiplierDivisors(endpoint11);
            await reporting.readMeteringMultiplierDivisor(endpoint11);
            await reporting.rmsVoltage(endpoint11, { min: 10, change: 20 });
            await reporting.rmsCurrent(endpoint11, { min: 10, change: 10 });
            await reporting.activePower(endpoint11, { min: 10, change: 15 });
            await reporting.currentSummDelivered(endpoint11, { min: 300 });
        },
    },
    {
        zigbeeModel: ['SM309-S'],
        model: 'SM309-S',
        vendor: 'Samotech',
        description: 'Zigbee dimmer 400W with power and energy metering',
        fromZigbee: extend_1.default.light_onoff_brightness().fromZigbee.concat([fromZigbee_1.default.electrical_measurement, fromZigbee_1.default.metering]),
        toZigbee: extend_1.default.light_onoff_brightness().toZigbee,
        configure: async (device, coordinatorEndpoint, logger) => {
            await extend_1.default.light_onoff_brightness().configure(device, coordinatorEndpoint, logger);
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff', 'genLevelCtrl', 'haElectricalMeasurement', 'seMetering']);
            await reporting.readEletricalMeasurementMultiplierDivisors(endpoint);
            await reporting.readMeteringMultiplierDivisor(endpoint);
            await reporting.rmsVoltage(endpoint, { min: 10, change: 20 });
            await reporting.rmsCurrent(endpoint, { min: 10, change: 10 });
            await reporting.activePower(endpoint, { min: 10, change: 15 });
            await reporting.currentSummDelivered(endpoint, { min: 300 });
            await reporting.onOff(endpoint);
        },
        exposes: extend_1.default.light_onoff_brightness().exposes.concat([e.power(), e.current(), e.voltage(), e.energy()]),
    },
    {
        zigbeeModel: ['SM309'],
        model: 'SM309',
        vendor: 'Samotech',
        description: 'Zigbee dimmer 400W',
        extend: [(0, modernExtend_1.light)({ configureReporting: true })],
    },
    {
        zigbeeModel: ['SM323'],
        fingerprint: [{ modelID: 'Dimmer-Switch-ZB3.0', manufacturerName: 'Samotech' }, { modelID: 'HK_DIM_A', manufacturerName: 'Samotech' }],
        model: 'SM323',
        vendor: 'Samotech',
        description: 'Zigbee retrofit dimmer 250W',
        extend: [(0, modernExtend_1.light)({ configureReporting: true }), (0, modernExtend_1.electricityMeter)()],
    },
    {
        zigbeeModel: ['SM324'],
        model: 'SM324',
        vendor: 'Samotech',
        description: '220V Zigbee CCT LED dimmer',
        extend: [(0, modernExtend_1.light)({ colorTemp: { range: [150, 500] }, configureReporting: true })],
    },
];
exports.default = definitions;
module.exports = definitions;
//# sourceMappingURL=samotech.js.map