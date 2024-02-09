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
const toZigbee_1 = __importDefault(require("../converters/toZigbee"));
const ota = __importStar(require("../lib/ota"));
const reporting = __importStar(require("../lib/reporting"));
const modernExtend_1 = require("../lib/modernExtend");
const e = exposes.presets;
// Make sure extend.ldight_* is not used (sengledExtend should be used instead)
const extend_1 = __importDefault(require("../lib/extend"));
const sengledExtend = {
    light_onoff_brightness: (options = {}) => extend_1.default.light_onoff_brightness({ disableEffect: true, disablePowerOnBehavior: true, ...options }),
    light_onoff_brightness_colortemp: (options = {}) => extend_1.default.light_onoff_brightness_colortemp({ disableEffect: true, disablePowerOnBehavior: true, ...options }),
    light_onoff_brightness_colortemp_color: (options = {}) => extend_1.default.light_onoff_brightness_colortemp_color({ disableEffect: true, disablePowerOnBehavior: true, ...options }),
};
const definitions = [
    {
        zigbeeModel: ['E13-N11'],
        model: 'E13-N11',
        vendor: 'Sengled',
        description: 'Flood light with motion sensor light outdoor',
        fromZigbee: sengledExtend.light_onoff_brightness().fromZigbee.concat([fromZigbee_1.default.ias_occupancy_alarm_1]),
        toZigbee: sengledExtend.light_onoff_brightness().toZigbee,
        exposes: sengledExtend.light_onoff_brightness().exposes.concat([e.occupancy()]),
        ota: ota.zigbeeOTA,
    },
    {
        zigbeeModel: ['E21-N13A'],
        model: 'E21-N13A',
        vendor: 'Sengled',
        description: 'Smart LED (A19)',
        extend: sengledExtend.light_onoff_brightness(),
        ota: ota.zigbeeOTA,
    },
    {
        zigbeeModel: ['E21-N1EA'],
        model: 'E21-N1EA',
        vendor: 'Sengled',
        description: 'Smart LED multicolor A19 bulb',
        fromZigbee: sengledExtend.light_onoff_brightness_colortemp_color({ colorTempRange: [154, 500] }).fromZigbee.concat([fromZigbee_1.default.metering]),
        toZigbee: sengledExtend.light_onoff_brightness_colortemp_color({ colorTempRange: [154, 500] }).toZigbee,
        exposes: sengledExtend.light_onoff_brightness_colortemp_color({ colorTempRange: [154, 500] }).exposes.concat([e.power(), e.energy()]),
        ota: ota.zigbeeOTA,
        configure: async (device, coordinatorEndpoint, logger) => {
            await sengledExtend.light_onoff_brightness_colortemp_color({ colorTempRange: [154, 500] })
                .configure(device, coordinatorEndpoint, logger);
            device.powerSource = 'Mains (single phase)';
            device.save();
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff', 'seMetering']);
            await reporting.readMeteringMultiplierDivisor(endpoint);
            await reporting.currentSummDelivered(endpoint);
            await reporting.instantaneousDemand(endpoint);
        },
    },
    {
        zigbeeModel: ['E12-N1E'],
        model: 'E12-N1E',
        vendor: 'Sengled',
        description: 'Smart LED multicolor (BR30)',
        fromZigbee: sengledExtend.light_onoff_brightness_colortemp_color({ colorTempRange: [154, 500] }).fromZigbee.concat([fromZigbee_1.default.metering]),
        toZigbee: sengledExtend.light_onoff_brightness_colortemp_color({ colorTempRange: [154, 500] }).toZigbee,
        exposes: sengledExtend.light_onoff_brightness_colortemp_color({ colorTempRange: [154, 500] }).exposes.concat([e.power(), e.energy()]),
        ota: ota.zigbeeOTA,
        configure: async (device, coordinatorEndpoint, logger) => {
            await sengledExtend.light_onoff_brightness_colortemp_color({ colorTempRange: [154, 500] })
                .configure(device, coordinatorEndpoint, logger);
            device.powerSource = 'Mains (single phase)';
            device.save();
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff', 'seMetering']);
            await reporting.readMeteringMultiplierDivisor(endpoint);
            await reporting.currentSummDelivered(endpoint);
            await reporting.instantaneousDemand(endpoint);
        },
    },
    {
        zigbeeModel: ['E1G-G8E'],
        model: 'E1G-G8E',
        vendor: 'Sengled',
        description: 'Multicolor light strip (2M)',
        extend: sengledExtend.light_onoff_brightness_colortemp_color(),
        ota: ota.zigbeeOTA,
    },
    {
        zigbeeModel: ['E11-U21U31'],
        model: 'E11-U21U31',
        vendor: 'Sengled',
        description: 'Element touch (A19)',
        extend: sengledExtend.light_onoff_brightness(),
        ota: ota.zigbeeOTA,
    },
    {
        zigbeeModel: ['E11-G13'],
        model: 'E11-G13',
        vendor: 'Sengled',
        description: 'Element classic (A19)',
        fromZigbee: sengledExtend.light_onoff_brightness().fromZigbee.concat([fromZigbee_1.default.metering]),
        toZigbee: sengledExtend.light_onoff_brightness().toZigbee,
        ota: ota.zigbeeOTA,
        configure: async (device, coordinatorEndpoint, logger) => {
            await sengledExtend.light_onoff_brightness().configure(device, coordinatorEndpoint, logger);
            device.powerSource = 'Mains (single phase)';
            device.save();
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff', 'seMetering']);
            await reporting.readMeteringMultiplierDivisor(endpoint);
            await reporting.currentSummDelivered(endpoint);
            await reporting.instantaneousDemand(endpoint);
        },
        exposes: sengledExtend.light_onoff_brightness().exposes.concat([e.power(), e.energy()]),
    },
    {
        zigbeeModel: ['E11-G23', 'E11-G33'],
        model: 'E11-G23/E11-G33',
        vendor: 'Sengled',
        description: 'Element classic (A60)',
        extend: sengledExtend.light_onoff_brightness(),
        ota: ota.zigbeeOTA,
    },
    {
        zigbeeModel: ['E11-N13', 'E11-N13A', 'E11-N14', 'E11-N14A'],
        model: 'E11-N13/E11-N13A/E11-N14/E11-N14A',
        vendor: 'Sengled',
        description: 'Element extra bright (A19)',
        extend: sengledExtend.light_onoff_brightness(),
        ota: ota.zigbeeOTA,
    },
    {
        zigbeeModel: ['Z01-CIA19NAE26'],
        model: 'Z01-CIA19NAE26',
        vendor: 'Sengled',
        description: 'Element touch (A19)',
        extend: sengledExtend.light_onoff_brightness(),
        ota: ota.zigbeeOTA,
    },
    {
        zigbeeModel: ['Z01-A19NAE26'],
        model: 'Z01-A19NAE26',
        vendor: 'Sengled',
        description: 'Element plus (A19)',
        fromZigbee: sengledExtend.light_onoff_brightness_colortemp_color().fromZigbee.concat([fromZigbee_1.default.metering]),
        toZigbee: sengledExtend.light_onoff_brightness_colortemp_color().toZigbee,
        ota: ota.zigbeeOTA,
        configure: async (device, coordinatorEndpoint, logger) => {
            await sengledExtend.light_onoff_brightness_colortemp_color().configure(device, coordinatorEndpoint, logger);
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['seMetering']);
            await reporting.readMeteringMultiplierDivisor(endpoint);
            await reporting.currentSummDelivered(endpoint);
            await reporting.instantaneousDemand(endpoint);
        },
        exposes: sengledExtend.light_onoff_brightness_colortemp_color().exposes.concat([e.power(), e.energy()]),
    },
    {
        zigbeeModel: ['Z01-A60EAE27'],
        model: 'Z01-A60EAE27',
        vendor: 'Sengled',
        description: 'Element Plus (A60)',
        extend: sengledExtend.light_onoff_brightness_colortemp(),
        ota: ota.zigbeeOTA,
    },
    {
        zigbeeModel: ['E11-N1EA'],
        model: 'E11-N1EA',
        vendor: 'Sengled',
        description: 'Element plus color (A19)',
        fromZigbee: sengledExtend.light_onoff_brightness_colortemp_color().fromZigbee.concat([fromZigbee_1.default.metering]),
        toZigbee: sengledExtend.light_onoff_brightness_colortemp_color().toZigbee,
        ota: ota.zigbeeOTA,
        configure: async (device, coordinatorEndpoint, logger) => {
            await sengledExtend.light_onoff_brightness_colortemp_color().configure(device, coordinatorEndpoint, logger);
            device.powerSource = 'Mains (single phase)';
            device.save();
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff', 'seMetering']);
            await reporting.readMeteringMultiplierDivisor(endpoint);
            await reporting.currentSummDelivered(endpoint);
            await reporting.instantaneousDemand(endpoint);
        },
        exposes: sengledExtend.light_onoff_brightness_colortemp_color().exposes.concat([e.power(), e.energy()]),
    },
    {
        zigbeeModel: ['E11-U2E'],
        model: 'E11-U2E',
        vendor: 'Sengled',
        description: 'Element color plus E27',
        extend: sengledExtend.light_onoff_brightness_colortemp_color(),
        ota: ota.zigbeeOTA,
    },
    {
        zigbeeModel: ['E11-U3E'],
        model: 'E11-U3E',
        vendor: 'Sengled',
        description: 'Element color plus B22',
        extend: sengledExtend.light_onoff_brightness_colortemp_color(),
        ota: ota.zigbeeOTA,
    },
    {
        zigbeeModel: ['E1F-N5E'],
        model: 'E1F-N5E',
        vendor: 'Sengled',
        description: 'Element color plus E12',
        fromZigbee: sengledExtend.light_onoff_brightness_colortemp_color({ colorTempRange: [154, 500] }).fromZigbee.concat([fromZigbee_1.default.metering]),
        toZigbee: sengledExtend.light_onoff_brightness_colortemp_color({ colorTempRange: [154, 500] }).toZigbee,
        exposes: sengledExtend.light_onoff_brightness_colortemp_color({ colorTempRange: [154, 500] }).exposes.concat([e.power(), e.energy()]),
        ota: ota.zigbeeOTA,
        configure: async (device, coordinatorEndpoint, logger) => {
            await sengledExtend.light_onoff_brightness_colortemp_color({ colorTempRange: [154, 500] })
                .configure(device, coordinatorEndpoint, logger);
            device.powerSource = 'Mains (single phase)';
            device.save();
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff', 'seMetering']);
            await reporting.readMeteringMultiplierDivisor(endpoint);
            await reporting.currentSummDelivered(endpoint);
            await reporting.instantaneousDemand(endpoint);
        },
    },
    {
        zigbeeModel: ['E12-N14'],
        model: 'E12-N14',
        vendor: 'Sengled',
        description: 'Element Classic (BR30)',
        extend: sengledExtend.light_onoff_brightness(),
        ota: ota.zigbeeOTA,
    },
    {
        zigbeeModel: ['E1A-AC2'],
        model: 'E1ACA4ABE38A',
        vendor: 'Sengled',
        description: 'Element downlight smart LED bulb',
        extend: sengledExtend.light_onoff_brightness(),
        ota: ota.zigbeeOTA,
    },
    {
        zigbeeModel: ['E1D-G73'],
        model: 'E1D-G73WNA',
        vendor: 'Sengled',
        description: 'Smart window and door sensor',
        fromZigbee: [fromZigbee_1.default.ias_contact_alarm_1, fromZigbee_1.default.battery],
        toZigbee: [],
        ota: ota.zigbeeOTA,
        exposes: [e.contact(), e.battery_low(), e.battery(), e.battery_voltage(), e.tamper()],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg']);
            await reporting.batteryVoltage(endpoint);
            await reporting.batteryPercentageRemaining(endpoint);
        },
    },
    {
        zigbeeModel: ['E2D-G73'],
        model: 'E2D-G73',
        vendor: 'Sengled',
        description: 'Smart window and door sensor G2',
        fromZigbee: [fromZigbee_1.default.ias_contact_alarm_1, fromZigbee_1.default.battery],
        toZigbee: [],
        ota: ota.zigbeeOTA,
        exposes: [e.contact(), e.battery_low(), e.battery(), e.battery_voltage(), e.tamper()],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg']);
            await reporting.batteryVoltage(endpoint);
            await reporting.batteryPercentageRemaining(endpoint);
        },
    },
    {
        zigbeeModel: ['E1C-NB6'],
        model: 'E1C-NB6',
        vendor: 'Sengled',
        description: 'Smart plug',
        extend: [(0, modernExtend_1.onOff)()],
        ota: ota.zigbeeOTA,
    },
    {
        zigbeeModel: ['E1C-NB7'],
        model: 'E1C-NB7',
        vendor: 'Sengled',
        description: 'Smart plug with energy tracker',
        fromZigbee: [fromZigbee_1.default.on_off, fromZigbee_1.default.metering],
        toZigbee: [toZigbee_1.default.on_off],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff', 'seMetering']);
            await reporting.onOff(endpoint);
            await reporting.readMeteringMultiplierDivisor(endpoint);
            await reporting.instantaneousDemand(endpoint);
        },
        exposes: [e.switch(), e.power(), e.energy()],
    },
    {
        zigbeeModel: ['E1E-G7F'],
        model: 'E1E-G7F',
        vendor: 'Sengled',
        description: 'Smart switch',
        fromZigbee: [fromZigbee_1.default.E1E_G7F_action],
        exposes: [e.action(['on', 'up', 'down', 'off', 'on_double', 'on_long', 'off_double', 'off_long'])],
        toZigbee: [],
        ota: ota.zigbeeOTA,
    },
    {
        zigbeeModel: ['E11-N1G'],
        model: 'E11-N1G',
        vendor: 'Sengled',
        description: 'Vintage LED edison bulb (ST19)',
        extend: sengledExtend.light_onoff_brightness(),
        ota: ota.zigbeeOTA,
    },
    {
        zigbeeModel: ['E1F-N9G'],
        model: 'E1F-N9G',
        vendor: 'Sengled',
        description: 'Smart LED filament candle (E12)',
        extend: sengledExtend.light_onoff_brightness(),
        ota: ota.zigbeeOTA,
    },
];
exports.default = definitions;
module.exports = definitions;
//# sourceMappingURL=sengled.js.map