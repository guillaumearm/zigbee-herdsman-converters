"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modernExtend_1 = require("../lib/modernExtend");
const definitions = [
    {
        fingerprint: [{ modelID: 'Dimmer-Switch-ZB3.0', manufacturerName: 'Candeo' }],
        model: 'C202',
        vendor: 'Candeo',
        description: 'Zigbee LED smart dimmer switch',
        extend: [(0, modernExtend_1.light)({ configureReporting: true })],
    },
    {
        fingerprint: [{ modelID: 'Dimmer-Switch-ZB3.0', manufacturerID: 4098 }],
        model: 'C210',
        vendor: 'Candeo',
        description: 'Zigbee dimming smart plug',
        extend: [(0, modernExtend_1.light)({ configureReporting: true })],
    },
    {
        zigbeeModel: ['HK-DIM-A', 'Candeo Zigbee Dimmer', 'HK_DIM_A'],
        fingerprint: [{ modelID: 'HK_DIM_A', manufacturerName: 'Shyugj' }],
        model: 'HK-DIM-A',
        vendor: 'Candeo',
        description: 'Zigbee LED dimmer smart switch',
        extend: [(0, modernExtend_1.light)({ configureReporting: true })],
    },
    {
        zigbeeModel: ['C204'],
        model: 'C204',
        vendor: 'Candeo',
        description: 'Zigbee micro smart dimmer',
        extend: [(0, modernExtend_1.light)({ configureReporting: true }), (0, modernExtend_1.electricityMeter)()],
    },
];
exports.default = definitions;
module.exports = definitions;
//# sourceMappingURL=candeo.js.map