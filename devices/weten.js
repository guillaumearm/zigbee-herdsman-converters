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
const tuya = __importStar(require("../lib/tuya"));
const extend_1 = __importDefault(require("../lib/extend"));
const exposes = __importStar(require("../lib/exposes"));
const e = exposes.presets;
const ea = exposes.access;
const definitions = [
    {
        fingerprint: [{ modelID: 'TS0001', manufacturerName: '_TZ3000_wrhhi5h2' }],
        model: '1GNNTS',
        vendor: 'WETEN',
        description: '1 gang no neutral touch wall switch',
        extend: extend_1.default.switch(),
        fromZigbee: [fromZigbee_1.default.on_off, fromZigbee_1.default.ignore_basic_report, fromZigbee_1.default.ignore_time_read],
    },
    {
        fingerprint: tuya.fingerprint('TS0601', ['_TZE204_6fk3gewc']),
        model: 'PCI E',
        vendor: 'WETEN',
        description: 'PC switch',
        fromZigbee: [tuya.fz.datapoints],
        toZigbee: [tuya.tz.datapoints],
        exposes: [
            e.binary('state', ea.STATE_SET, 'ON', 'OFF').withDescription('PC Power'),
            e.binary('buzzer_feedback', ea.STATE_SET, 'ON', 'OFF').withDescription('ON means no buzzer noise'),
            e.child_lock(),
            e.binary('rf_pairing', ea.STATE_SET, 'ON', 'OFF').withDescription('Enables/disables RF 433 remote pairing mode'),
        ],
        meta: {
            tuyaDatapoints: [
                [1, 'state', tuya.valueConverter.onOff],
                [104, 'buzzer_feedback', tuya.valueConverter.onOff],
                [106, 'child_lock', tuya.valueConverter.lockUnlock],
                [103, 'rf_pairing', tuya.valueConverter.onOff],
            ],
        },
    },
];
exports.default = definitions;
module.exports = definitions;
//# sourceMappingURL=weten.js.map