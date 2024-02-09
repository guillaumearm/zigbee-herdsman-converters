"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modernExtend_1 = require("../lib/modernExtend");
const definitions = [
    {
        zigbeeModel: ['Hilux DZ8'],
        model: 'DZ8',
        vendor: 'Hilux',
        description: 'Spot 7W',
        extend: [(0, modernExtend_1.light)({ colorTemp: { range: [153, 370] }, powerOnBehavior: false })],
    },
];
exports.default = definitions;
module.exports = definitions;
//# sourceMappingURL=hilux.js.map