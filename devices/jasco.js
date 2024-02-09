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
const reporting = __importStar(require("../lib/reporting"));
const extend_1 = __importDefault(require("../lib/extend"));
const exposes = __importStar(require("../lib/exposes"));
const modernExtend_1 = require("../lib/modernExtend");
const e = exposes.presets;
const definitions = [
    {
        zigbeeModel: ['35938'],
        model: 'ZB3102',
        vendor: 'Jasco Products',
        description: 'Zigbee plug-in smart dimmer',
        extend: [(0, modernExtend_1.light)({ configureReporting: true })],
    },
    {
        zigbeeModel: ['43132'],
        model: '43132',
        vendor: 'Jasco',
        description: 'Zigbee smart outlet',
        extend: extend_1.default.switch(),
        fromZigbee: [...extend_1.default.switch().fromZigbee, fromZigbee_1.default.metering],
        exposes: [e.switch(), e.power(), e.energy()],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff', 'seMetering']);
            await reporting.onOff(endpoint);
            await reporting.readMeteringMultiplierDivisor(endpoint);
            await reporting.instantaneousDemand(endpoint);
            await reporting.currentSummDelivered(endpoint);
        },
    },
    {
        zigbeeModel: ['43095'],
        model: '43095',
        vendor: 'Jasco Products',
        description: 'Zigbee smart plug-in switch with energy metering',
        fromZigbee: [fromZigbee_1.default.command_on_state, fromZigbee_1.default.command_off_state, fromZigbee_1.default.metering],
        extend: extend_1.default.switch(),
        exposes: [e.switch(), e.power(), e.energy()],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint1 = device.getEndpoint(1);
            await reporting.bind(endpoint1, coordinatorEndpoint, ['genOnOff', 'seMetering']);
            await reporting.onOff(endpoint1);
            await reporting.instantaneousDemand(endpoint1);
            await reporting.readMeteringMultiplierDivisor(endpoint1);
        },
    },
];
exports.default = definitions;
module.exports = definitions;
//# sourceMappingURL=jasco.js.map