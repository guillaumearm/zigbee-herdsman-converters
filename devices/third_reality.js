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
const reporting = __importStar(require("../lib/reporting"));
const extend_1 = __importDefault(require("../lib/extend"));
const ota = __importStar(require("../lib/ota"));
const modernExtend_1 = require("../lib/modernExtend");
const modernExtend_2 = require("../lib/modernExtend");
const e = exposes.presets;
const fzLocal = {
    thirdreality_acceleration: {
        cluster: '65521',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const payload = {};
            if (msg.data['1'])
                payload.x_axis = msg.data['1'];
            if (msg.data['2'])
                payload.y_axis = msg.data['2'];
            if (msg.data['3'])
                payload.z_axis = msg.data['3'];
            return payload;
        },
    },
    thirdreality_private_motion_sensor: {
        cluster: 'manuSpecificUbisysDeviceSetup',
        type: 'attributeReport',
        convert: (model, msg, publish, options, meta) => {
            const zoneStatus = msg.data[2];
            return { occupancy: (zoneStatus & 1) > 0 };
        },
    },
};
const definitions = [
    {
        zigbeeModel: ['3RSS009Z'],
        model: '3RSS009Z',
        vendor: 'Third Reality',
        description: 'Smart switch Gen3',
        ota: ota.zigbeeOTA,
        fromZigbee: [fromZigbee_1.default.on_off, fromZigbee_1.default.battery],
        toZigbee: [toZigbee_1.default.on_off, toZigbee_1.default.ignore_transition],
        exposes: [e.switch(), e.battery(), e.battery_voltage()],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await endpoint.read('genPowerCfg', ['batteryPercentageRemaining']);
            device.powerSource = 'Battery';
            device.save();
        },
    },
    {
        zigbeeModel: ['3RSS008Z'],
        model: '3RSS008Z',
        vendor: 'Third Reality',
        description: 'RealitySwitch Plus',
        fromZigbee: [fromZigbee_1.default.on_off, fromZigbee_1.default.battery],
        toZigbee: [toZigbee_1.default.on_off, toZigbee_1.default.ignore_transition],
        meta: { battery: { voltageToPercentage: '3V_2100' } },
        exposes: [e.switch(), e.battery(), e.battery_voltage()],
    },
    {
        zigbeeModel: ['3RSS007Z'],
        model: '3RSS007Z',
        vendor: 'Third Reality',
        description: 'Smart light switch',
        extend: extend_1.default.switch(),
        meta: { disableDefaultResponse: true },
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff']);
            await reporting.onOff(endpoint);
        },
    },
    {
        zigbeeModel: ['3RSL011Z'],
        model: '3RSL011Z',
        vendor: 'Third Reality',
        description: 'Smart light A19',
        extend: [(0, modernExtend_1.light)({ colorTemp: { range: undefined } })],
    },
    {
        zigbeeModel: ['3RSL012Z'],
        model: '3RSL012Z',
        vendor: 'Third Reality',
        description: 'Smart light BR30',
        extend: [(0, modernExtend_1.light)({ colorTemp: { range: undefined } })],
    },
    {
        zigbeeModel: ['3RWS18BZ'],
        model: '3RWS18BZ',
        vendor: 'Third Reality',
        description: 'Water sensor',
        fromZigbee: [fromZigbee_1.default.ias_water_leak_alarm_1, fromZigbee_1.default.battery],
        toZigbee: [],
        ota: ota.zigbeeOTA,
        exposes: [e.water_leak(), e.battery_low(), e.battery(), e.battery_voltage()],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await endpoint.read('genPowerCfg', ['batteryPercentageRemaining']);
            device.powerSource = 'Battery';
            device.save();
        },
    },
    {
        zigbeeModel: ['3RMS16BZ'],
        model: '3RMS16BZ',
        vendor: 'Third Reality',
        description: 'Wireless motion sensor',
        fromZigbee: [fromZigbee_1.default.ias_occupancy_alarm_1, fromZigbee_1.default.battery],
        toZigbee: [],
        ota: ota.zigbeeOTA,
        exposes: [e.occupancy(), e.battery_low(), e.battery(), e.battery_voltage()],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await endpoint.read('genPowerCfg', ['batteryPercentageRemaining']);
            device.powerSource = 'Battery';
            device.save();
        },
    },
    {
        zigbeeModel: ['3RDS17BZ'],
        model: '3RDS17BZ',
        vendor: 'Third Reality',
        description: 'Door sensor',
        fromZigbee: [fromZigbee_1.default.ias_contact_alarm_1, fromZigbee_1.default.battery],
        toZigbee: [],
        ota: ota.zigbeeOTA,
        exposes: [e.contact(), e.battery_low(), e.battery(), e.battery_voltage()],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await endpoint.read('genPowerCfg', ['batteryPercentageRemaining']);
            device.powerSource = 'Battery';
            device.save();
        },
    },
    {
        zigbeeModel: ['3RSP019BZ'],
        model: '3RSP019BZ',
        vendor: 'Third Reality',
        description: 'Zigbee / BLE smart plug',
        extend: [(0, modernExtend_1.onOff)()],
        ota: ota.zigbeeOTA,
    },
    {
        zigbeeModel: ['3RSB015BZ'],
        model: '3RSB015BZ',
        vendor: 'Third Reality',
        description: 'Roller shade',
        fromZigbee: [fromZigbee_1.default.cover_position_tilt, fromZigbee_1.default.battery],
        toZigbee: [toZigbee_1.default.cover_state, toZigbee_1.default.cover_position_tilt],
        meta: { battery: { dontDividePercentage: false } },
        ota: ota.zigbeeOTA,
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg', 'closuresWindowCovering']);
            await reporting.currentPositionLiftPercentage(endpoint);
            try {
                await reporting.batteryPercentageRemaining(endpoint);
            }
            catch (error) { /* Fails for some*/ }
        },
        exposes: [e.cover_position(), e.battery()],
    },
    {
        zigbeeModel: ['3RSB22BZ'],
        model: '3RSB22BZ',
        vendor: 'Third Reality',
        description: 'Smart button',
        fromZigbee: [fromZigbee_1.default.battery, fromZigbee_1.default.itcmdr_clicks],
        toZigbee: [],
        ota: ota.zigbeeOTA,
        exposes: [e.battery(), e.battery_low(), e.battery_voltage(), e.action(['single', 'double', 'long'])],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await endpoint.read('genPowerCfg', ['batteryPercentageRemaining']);
            device.powerSource = 'Battery';
            device.save();
        },
    },
    {
        zigbeeModel: ['3RTHS24BZ'],
        model: '3RTHS24BZ',
        vendor: 'Third Reality',
        description: 'Temperature and humidity sensor',
        fromZigbee: [fromZigbee_1.default.battery, fromZigbee_1.default.temperature, fromZigbee_1.default.humidity],
        toZigbee: [],
        exposes: [e.battery(), e.temperature(), e.humidity(), e.battery_voltage()],
        ota: ota.zigbeeOTA,
    },
    {
        zigbeeModel: ['3RTHS0224BZ'],
        model: '3RTHS0224BZ',
        vendor: 'Third Reality',
        description: 'Temperature and humidity sensor v2',
        extend: [(0, modernExtend_2.temperature)(), (0, modernExtend_2.humidity)(), (0, modernExtend_2.batteryPercentage)()],
        ota: ota.zigbeeOTA,
    },
    {
        zigbeeModel: ['3RSP02028BZ'],
        model: '3RSP02028BZ',
        vendor: 'Third Reality',
        description: 'Zigbee / BLE smart plug with power',
        fromZigbee: [fromZigbee_1.default.on_off, fromZigbee_1.default.electrical_measurement, fromZigbee_1.default.metering, fromZigbee_1.default.power_on_behavior],
        toZigbee: [toZigbee_1.default.on_off, toZigbee_1.default.power_on_behavior],
        ota: ota.zigbeeOTA,
        exposes: [e.switch(), e.power_on_behavior(), e.ac_frequency(), e.power(), e.power_factor(), e.energy(), e.current(), e.voltage()],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff', 'haElectricalMeasurement', 'seMetering']);
            await endpoint.read('haElectricalMeasurement', ['acPowerMultiplier', 'acPowerDivisor']);
            await reporting.onOff(endpoint);
            await reporting.activePower(endpoint, { change: 10 });
            await reporting.rmsCurrent(endpoint, { change: 50 });
            await reporting.rmsVoltage(endpoint, { change: 5 });
            await reporting.readMeteringMultiplierDivisor(endpoint);
            endpoint.saveClusterAttributeKeyValue('seMetering', { divisor: 3600000, multiplier: 1 });
            endpoint.saveClusterAttributeKeyValue('haElectricalMeasurement', {
                acVoltageMultiplier: 1, acVoltageDivisor: 10, acCurrentMultiplier: 1, acCurrentDivisor: 1000, acPowerMultiplier: 1,
                acPowerDivisor: 10,
            });
            device.save();
        },
    },
    {
        zigbeeModel: ['3RVS01031Z'],
        model: '3RVS01031Z',
        vendor: 'Third Reality',
        description: 'Zigbee vibration sensor',
        fromZigbee: [fromZigbee_1.default.ias_vibration_alarm_1, fromZigbee_1.default.battery, fzLocal.thirdreality_acceleration],
        toZigbee: [],
        ota: ota.zigbeeOTA,
        exposes: [e.vibration(), e.battery_low(), e.battery(), e.battery_voltage(), e.x_axis(), e.y_axis(), e.z_axis()],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await endpoint.read('genPowerCfg', ['batteryPercentageRemaining']);
            device.powerSource = 'Battery';
            device.save();
        },
    },
    {
        zigbeeModel: ['3RSNL02043Z'],
        model: '3RSNL02043Z',
        vendor: 'Third Reality',
        description: 'Zigbee multi-function night light',
        ota: ota.zigbeeOTA,
        fromZigbee: extend_1.default.light_onoff_brightness_colortemp_color().fromZigbee.concat([
            fzLocal.thirdreality_private_motion_sensor, fromZigbee_1.default.illuminance, fromZigbee_1.default.ias_occupancy_alarm_1_report
        ]),
        toZigbee: extend_1.default.light_onoff_brightness_colortemp_color().toZigbee,
        exposes: [e.light_brightness_colorxy(),
            e.occupancy(), e.illuminance(), e.illuminance_lux().withUnit('lx')],
        configure: async (device, coordinatorEndpoint, logger) => {
            device.powerSource = 'Mains (single phase)';
            device.save();
        },
    },
    {
        zigbeeModel: ['3RSPE01044BZ'],
        model: '3RSPE01044BZ',
        vendor: 'Third Reality',
        description: 'Zigbee / BLE smart plug with power',
        fromZigbee: [fromZigbee_1.default.on_off, fromZigbee_1.default.electrical_measurement, fromZigbee_1.default.metering, fromZigbee_1.default.power_on_behavior],
        toZigbee: [toZigbee_1.default.on_off, toZigbee_1.default.power_on_behavior],
        ota: ota.zigbeeOTA,
        exposes: [e.switch(), e.power_on_behavior(), e.ac_frequency(), e.power(), e.power_factor(), e.energy(), e.current(), e.voltage()],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff', 'haElectricalMeasurement', 'seMetering']);
            await endpoint.read('haElectricalMeasurement', ['acPowerMultiplier', 'acPowerDivisor']);
            await reporting.onOff(endpoint);
            await reporting.activePower(endpoint, { change: 10 });
            await reporting.rmsCurrent(endpoint, { change: 50 });
            await reporting.rmsVoltage(endpoint, { change: 5 });
            await reporting.readMeteringMultiplierDivisor(endpoint);
            endpoint.saveClusterAttributeKeyValue('seMetering', { divisor: 3600000, multiplier: 1 });
            endpoint.saveClusterAttributeKeyValue('haElectricalMeasurement', {
                acVoltageMultiplier: 1, acVoltageDivisor: 10, acCurrentMultiplier: 1, acCurrentDivisor: 1000, acPowerMultiplier: 1,
                acPowerDivisor: 10,
            });
            device.save();
        },
    },
];
exports.default = definitions;
module.exports = definitions;
//# sourceMappingURL=third_reality.js.map