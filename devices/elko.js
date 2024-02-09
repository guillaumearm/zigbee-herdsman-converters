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
const constants = __importStar(require("../lib/constants"));
const reporting = __importStar(require("../lib/reporting"));
const modernExtend_1 = require("../lib/modernExtend");
const ea = exposes.access;
const e = exposes.presets;
const definitions = [
    {
        zigbeeModel: ['ElkoDimmerZHA'],
        model: '316GLEDRF',
        vendor: 'ELKO',
        description: 'ZigBee in-wall smart dimmer',
        extend: [(0, modernExtend_1.light)({ configureReporting: true })],
        meta: { disableDefaultResponse: true },
    },
    {
        zigbeeModel: ['ElkoDimmerRemoteZHA'],
        model: 'EKO05806',
        vendor: 'ELKO',
        description: 'Elko ESH 316 Endevender RF',
        fromZigbee: [fromZigbee_1.default.command_toggle, fromZigbee_1.default.command_step],
        toZigbee: [],
        exposes: [e.action(['toggle', 'brightness_step_up', 'brightness_step_down'])],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff', 'genLevelCtrl']);
            await reporting.onOff(endpoint);
        },
    },
    {
        zigbeeModel: ['Super TR'],
        model: '4523430',
        vendor: 'ELKO',
        description: 'ESH Plus Super TR RF PH',
        fromZigbee: [fromZigbee_1.default.elko_thermostat, fromZigbee_1.default.thermostat],
        toZigbee: [toZigbee_1.default.thermostat_occupied_heating_setpoint, toZigbee_1.default.thermostat_occupied_heating_setpoint, toZigbee_1.default.elko_load,
            toZigbee_1.default.elko_display_text, toZigbee_1.default.elko_power_status, toZigbee_1.default.elko_external_temp, toZigbee_1.default.elko_mean_power, toZigbee_1.default.elko_child_lock, toZigbee_1.default.elko_frost_guard,
            toZigbee_1.default.elko_relay_state, toZigbee_1.default.elko_sensor_mode, toZigbee_1.default.elko_local_temperature_calibration, toZigbee_1.default.elko_max_floor_temp,
            toZigbee_1.default.elko_regulator_mode, toZigbee_1.default.elko_regulator_time, toZigbee_1.default.elko_night_switching],
        exposes: [e.text('display_text', ea.ALL).withDescription('Displayed text on thermostat display (zone). Max 14 characters'),
            e.numeric('load', ea.ALL).withUnit('W')
                .withDescription('Load in W when heating is on (between 0-2000 W). The thermostat uses the value as input to the ' +
                'mean_power calculation.')
                .withValueMin(0).withValueMax(2000),
            e.binary('regulator_mode', ea.ALL, 'regulator', 'thermostat')
                .withDescription('Device in regulator or thermostat mode.'),
            e.numeric('regulator_time', ea.ALL).withUnit('min')
                .withValueMin(5).withValueMax(20).withDescription('When device is in regulator mode this controls the time between each ' +
                'in/out connection. When device is in thermostat mode this controls the  time between each in/out switch when measured ' +
                'temperature is within +-0.5 °C set temperature. Choose a long time for (slow) concrete floors and a short time for ' +
                '(quick) wooden floors.'),
            e.climate().withSetpoint('occupied_heating_setpoint', 5, 50, 1)
                .withLocalTemperature(ea.STATE)
                .withLocalTemperatureCalibration()
                .withSystemMode(['off', 'heat']).withRunningState(['idle', 'heat']),
            e.temperature_sensor_select(['air', 'floor', 'supervisor_floor']),
            e.numeric('floor_temp', ea.STATE_GET).withUnit('°C')
                .withDescription('Current temperature measured from the floor sensor'),
            e.numeric('max_floor_temp', ea.ALL).withUnit('°C')
                .withDescription('Set max floor temperature (between 20-35 °C) when "supervisor_floor" is set')
                .withValueMin(20).withValueMax(35),
            e.numeric('mean_power', ea.STATE_GET).withUnit('W')
                .withDescription('Reports average power usage last 10 minutes'),
            e.binary('child_lock', ea.ALL, 'lock', 'unlock')
                .withDescription('Enables/disables physical input on the device'),
            e.binary('frost_guard', ea.ALL, 'on', 'off')
                .withDescription('When frost guard is ON, it is activated when the thermostat is switched OFF with the ON/OFF button.' +
                'At the same time, the display will fade and the text "Frostsikring x °C" appears in the display and remains until the ' +
                'thermostat is switched on again.'),
            e.binary('night_switching', ea.ALL, 'on', 'off')
                .withDescription('Turn on or off night setting.'),
        ],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['hvacThermostat', 'genBasic', 'genIdentify']);
            // standard ZCL attributes
            await reporting.thermostatTemperature(endpoint);
            await reporting.thermostatOccupiedHeatingSetpoint(endpoint);
            // ELKO attributes
            // Load value
            await endpoint.configureReporting('hvacThermostat', [{
                    attribute: 'elkoLoad',
                    minimumReportInterval: 0,
                    maximumReportInterval: constants.repInterval.HOUR,
                    reportableChange: 1,
                }]);
            // Power status
            await endpoint.configureReporting('hvacThermostat', [{
                    attribute: 'elkoPowerStatus',
                    minimumReportInterval: 0,
                    maximumReportInterval: constants.repInterval.HOUR,
                    reportableChange: null,
                }]);
            // Power consumption
            await endpoint.configureReporting('hvacThermostat', [{
                    attribute: 'elkoMeanPower',
                    minimumReportInterval: 0,
                    maximumReportInterval: constants.repInterval.HOUR,
                    reportableChange: 5,
                }]);
            // External temp sensor (floor)
            await endpoint.configureReporting('hvacThermostat', [{
                    attribute: 'elkoExternalTemp',
                    minimumReportInterval: 0,
                    maximumReportInterval: constants.repInterval.HOUR,
                    reportableChange: 10,
                }]);
            // Child lock active/inactive
            await endpoint.configureReporting('hvacThermostat', [{
                    attribute: 'elkoChildLock',
                    minimumReportInterval: 0,
                    maximumReportInterval: constants.repInterval.HOUR,
                    reportableChange: null,
                }]);
            // Night switching
            await endpoint.configureReporting('hvacThermostat', [{
                    attribute: 'elkoNightSwitching',
                    minimumReportInterval: 0,
                    maximumReportInterval: constants.repInterval.HOUR,
                    reportableChange: null,
                }]);
            // Frost guard
            await endpoint.configureReporting('hvacThermostat', [{
                    attribute: 'elkoFrostGuard',
                    minimumReportInterval: 0,
                    maximumReportInterval: constants.repInterval.HOUR,
                    reportableChange: null,
                }]);
            // Heating active/inactive
            await endpoint.configureReporting('hvacThermostat', [{
                    attribute: 'elkoRelayState',
                    minimumReportInterval: 0,
                    maximumReportInterval: constants.repInterval.HOUR,
                    reportableChange: null,
                }]);
            // Max floor temp
            await endpoint.configureReporting('hvacThermostat', [{
                    attribute: 'elkoMaxFloorTemp',
                    minimumReportInterval: 0,
                    maximumReportInterval: constants.repInterval.HOUR,
                    reportableChange: 1,
                }]);
            // Regulator mode
            await endpoint.configureReporting('hvacThermostat', [{
                    attribute: 'elkoRegulatorMode',
                    minimumReportInterval: 0,
                    maximumReportInterval: constants.repInterval.HOUR,
                    reportableChange: null,
                }]);
            // Regulator time
            await endpoint.configureReporting('hvacThermostat', [{
                    attribute: 'elkoRegulatorTime',
                    minimumReportInterval: 0,
                    maximumReportInterval: constants.repInterval.HOUR,
                    reportableChange: 1,
                }]);
            // Trigger read
            await endpoint.read('hvacThermostat', ['elkoDisplayText', 'elkoSensor']);
            device.powerSource = 'Mains (single phase)';
            device.save();
        },
    },
];
exports.default = definitions;
module.exports = definitions;
//# sourceMappingURL=elko.js.map