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
const legacy = __importStar(require("../lib/legacy"));
const toZigbee_1 = __importDefault(require("../converters/toZigbee"));
const reporting = __importStar(require("../lib/reporting"));
const extend_1 = __importDefault(require("../lib/extend"));
const modernExtend_1 = require("../lib/modernExtend");
const e = exposes.presets;
const definitions = [
    {
        zigbeeModel: ['5j6ifxj', '5j6ifxj\u0000'],
        model: 'BW-IS3',
        vendor: 'BlitzWolf',
        description: 'Rechargeable Zigbee PIR motion sensor',
        fromZigbee: [legacy.fz.blitzwolf_occupancy_with_timeout],
        toZigbee: [],
        exposes: [e.occupancy()],
    },
    {
        fingerprint: [{ modelID: 'TS0003', manufacturerName: '_TYZB01_aneiicmq' }],
        model: 'BW-SS7_1gang',
        vendor: 'BlitzWolf',
        description: 'Zigbee 3.0 smart light switch module 1 gang',
        extend: [(0, modernExtend_1.onOff)()],
        toZigbee: [toZigbee_1.default.TYZB01_on_off],
    },
    {
        fingerprint: [{ modelID: 'TS0003', manufacturerName: '_TYZB01_digziiav' }],
        model: 'BW-SS7_2gang',
        vendor: 'BlitzWolf',
        description: 'Zigbee 3.0 smart light switch module 2 gang',
        extend: extend_1.default.switch(),
        exposes: [e.switch().withEndpoint('l1'), e.switch().withEndpoint('l2')],
        endpoint: (device) => {
            return { 'l1': 1, 'l2': 2 };
        },
        toZigbee: [toZigbee_1.default.TYZB01_on_off],
        meta: { multiEndpoint: true },
        configure: async (device, coordinatorEndpoint, logger) => {
            await reporting.bind(device.getEndpoint(1), coordinatorEndpoint, ['genOnOff']);
            await reporting.bind(device.getEndpoint(2), coordinatorEndpoint, ['genOnOff']);
        },
    },
];
exports.default = definitions;
module.exports = definitions;
//# sourceMappingURL=blitzwolf.js.map