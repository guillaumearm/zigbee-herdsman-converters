"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modernExtend_1 = require("../lib/modernExtend");
const definitions = [
    {
        zigbeeModel: ['BoxDIM2 98425031', '98425031', 'BoxDIMZ 98425031'],
        model: '98425031',
        vendor: 'Nordtronic',
        description: 'Box Dimmer 2.0',
        extend: [(0, modernExtend_1.light)({ configureReporting: true })],
    },
    {
        zigbeeModel: ['BoxRelayZ 98423051'],
        model: '98423051',
        vendor: 'Nordtronic',
        description: 'Zigbee switch 400W',
        extend: [(0, modernExtend_1.onOff)()],
    },
];
exports.default = definitions;
module.exports = definitions;
//# sourceMappingURL=nordtronic.js.map