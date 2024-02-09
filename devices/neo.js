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
const exposes = __importStar(require("../lib/exposes"));
const fromZigbee_1 = __importDefault(require("../converters/fromZigbee"));
const legacy = __importStar(require("../lib/legacy"));
const e = exposes.presets;
const ea = exposes.access;
const tuya = __importStar(require("../lib/tuya"));
const definitions = [
    {
        fingerprint: [{ modelID: 'TS0601', manufacturerName: '_TZE200_d0yu2xgi' }],
        zigbeeModel: ['0yu2xgi'],
        model: 'NAS-AB02B0',
        vendor: 'Neo',
        description: 'Temperature & humidity sensor and alarm',
        fromZigbee: [legacy.fz.neo_t_h_alarm, fromZigbee_1.default.ignore_basic_report, fromZigbee_1.default.ignore_tuya_set_time],
        toZigbee: [legacy.tz.neo_t_h_alarm],
        exposes: [
            e.temperature(), e.humidity(), e.binary('humidity_alarm', ea.STATE_SET, true, false), e.battery_low(),
            e.binary('temperature_alarm', ea.STATE_SET, true, false),
            e.binary('alarm', ea.STATE_SET, true, false),
            e.enum('melody', ea.STATE_SET, Array.from(Array(18).keys()).map((x) => (x + 1).toString())),
            e.numeric('duration', ea.STATE_SET).withUnit('s').withValueMin(0).withValueMax(1800),
            e.numeric('temperature_min', ea.STATE_SET).withUnit('°C').withValueMin(-20).withValueMax(80),
            e.numeric('temperature_max', ea.STATE_SET).withUnit('°C').withValueMin(-20).withValueMax(80),
            e.numeric('humidity_min', ea.STATE_SET).withUnit('%').withValueMin(1).withValueMax(100),
            e.numeric('humidity_max', ea.STATE_SET).withUnit('%').withValueMin(1).withValueMax(100),
            e.enum('volume', ea.STATE_SET, ['low', 'medium', 'high']),
            e.enum('power_type', ea.STATE, ['battery_full', 'battery_high', 'battery_medium', 'battery_low', 'usb']),
        ],
        onEvent: tuya.onEventSetLocalTime,
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await endpoint.command('manuSpecificTuya', 'dataQuery', {});
            await endpoint.command('manuSpecificTuya', 'mcuVersionRequest', { 'seq': 0x0002 });
        },
    },
    {
        fingerprint: tuya.fingerprint('TS0601', ['_TZE200_t1blo2bj', '_TZE204_t1blo2bj']),
        zigbeeModel: ['1blo2bj', 'lrfgpny'],
        model: 'NAS-AB02B2',
        vendor: 'Neo',
        description: 'Alarm',
        fromZigbee: [legacy.fz.neo_alarm, fromZigbee_1.default.ignore_basic_report],
        toZigbee: [legacy.tz.neo_alarm],
        exposes: [
            e.battery_low(),
            e.binary('alarm', ea.STATE_SET, true, false),
            e.enum('melody', ea.STATE_SET, Array.from(Array(18).keys()).map((x) => (x + 1).toString())),
            e.numeric('duration', ea.STATE_SET).withUnit('s').withValueMin(0).withValueMax(1800),
            e.enum('volume', ea.STATE_SET, ['low', 'medium', 'high']),
            e.numeric('battpercentage', ea.STATE).withUnit('%'),
        ],
        onEvent: tuya.onEventSetLocalTime,
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await endpoint.command('manuSpecificTuya', 'dataQuery', {});
            await endpoint.command('manuSpecificTuya', 'mcuVersionRequest', { 'seq': 0x0002 });
        },
    },
    {
        fingerprint: [{ modelID: 'TS0601', manufacturerName: '_TZE200_7hfcudw5' }],
        model: 'NAS-PD07',
        vendor: 'Neo',
        description: 'Motion, temperature & humidity sensor',
        fromZigbee: [legacy.fz.neo_nas_pd07, fromZigbee_1.default.ignore_tuya_set_time],
        toZigbee: [legacy.tz.neo_nas_pd07],
        onEvent: tuya.onEventSetTime,
        exposes: [e.occupancy(), e.humidity(), e.temperature(), e.tamper(), e.battery_low(),
            e.enum('power_type', ea.STATE, ['battery_full', 'battery_high', 'battery_medium', 'battery_low', 'usb']),
            e.enum('alarm', ea.STATE, ['over_temperature', 'over_humidity', 'below_min_temperature', 'below_min_humdity', 'off'])
                .withDescription('Temperature/humidity alarm status'),
            e.numeric('temperature_min', ea.STATE_SET).withUnit('°C').withValueMin(-20).withValueMax(80),
            e.numeric('temperature_max', ea.STATE_SET).withUnit('°C').withValueMin(-20).withValueMax(80),
            e.binary('temperature_scale', ea.STATE_SET, '°C', '°F').withDescription('Temperature scale (°F/°C)'),
            e.numeric('humidity_min', ea.STATE_SET).withUnit('%').withValueMin(1).withValueMax(100),
            e.numeric('humidity_max', ea.STATE_SET).withUnit('%').withValueMin(1).withValueMax(100),
            // e.binary('unknown_111', ea.STATE_SET, 'ON', 'OFF').withDescription('Unknown datapoint 111 (default: ON)'),
            // e.binary('unknown_112', ea.STATE_SET, 'ON', 'OFF').withDescription('Unknown datapoint 112 (default: ON)')
        ],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await tuya.configureMagicPacket(device, coordinatorEndpoint, logger);
            await endpoint.command('manuSpecificTuya', 'mcuVersionRequest', { 'seq': 0x0002 });
        },
    },
    {
        fingerprint: tuya.fingerprint('TS0601', ['_TZE200_nlrfgpny', '_TZE204_nlrfgpny']),
        model: 'NAS-AB06B2',
        vendor: 'Neo',
        description: 'Outdoor solar alarm',
        fromZigbee: [tuya.fz.datapoints],
        toZigbee: [tuya.tz.datapoints],
        configure: tuya.configureMagicPacket,
        exposes: [
            e.enum('alarm_state', ea.STATE, ['alarm_sound', 'alarm_light', 'alarm_sound_light', 'normal']).withDescription('Alarm status'),
            e.binary('alarm_switch', ea.STATE_SET, 'ON', 'OFF').withDescription('Enable alarm'),
            e.binary('tamper_alarm_switch', ea.STATE_SET, 'ON', 'OFF').withDescription('Enable tamper alarm'),
            e.binary('tamper_alarm', ea.STATE, 'ON', 'OFF').withDescription('Indicates whether the device is tampered'),
            e.enum('alarm_melody', ea.STATE_SET, ['melody_1', 'melody_2', 'melody_3']).withDescription('Alarm sound effect'),
            e.enum('alarm_mode', ea.STATE_SET, ['alarm_sound', 'alarm_light', 'alarm_sound_light']).withDescription('Alarm mode'),
            e.numeric('alarm_time', ea.STATE_SET).withValueMin(1).withValueMax(60).withValueStep(1).withUnit('min')
                .withDescription('Alarm duration in minutes'),
            e.binary('charging', ea.STATE, true, false).withDescription('Charging status'),
            e.battery(),
        ],
        meta: {
            tuyaDatapoints: [
                [1, 'alarm_state', tuya.valueConverterBasic.lookup({ 'alarm_sound': tuya.enum(0), 'alarm_light': tuya.enum(1),
                        'alarm_sound_light': tuya.enum(2), 'no_alarm': tuya.enum(3) })],
                [13, 'alarm_switch', tuya.valueConverter.onOff],
                [101, 'tamper_alarm_switch', tuya.valueConverter.onOff],
                [20, 'tamper_alarm', tuya.valueConverter.onOff],
                [21, 'alarm_melody', tuya.valueConverterBasic.lookup({ 'melody_1': tuya.enum(0), 'melody_2': tuya.enum(1),
                        'melody_3': tuya.enum(2) })],
                [102, 'alarm_mode', tuya.valueConverterBasic.lookup({ 'alarm_sound': tuya.enum(0), 'alarm_light': tuya.enum(1),
                        'alarm_sound_light': tuya.enum(2) })],
                [7, 'alarm_time', tuya.valueConverter.raw],
                [6, 'charging', tuya.valueConverter.raw],
                [15, 'battery', tuya.valueConverter.raw],
            ],
        },
    },
];
exports.default = definitions;
module.exports = definitions;
//# sourceMappingURL=neo.js.map