"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modernExtend_1 = require("../lib/modernExtend");
const definitions = [
    {
        zigbeeModel: ['FB56-ZBW14LF1.4'],
        model: '322054',
        vendor: 'Lanesto',
        description: 'Dimmable led driver',
        extend: [(0, modernExtend_1.light)()],
    },
];
exports.default = definitions;
module.exports = definitions;
//# sourceMappingURL=lanesto.js.map