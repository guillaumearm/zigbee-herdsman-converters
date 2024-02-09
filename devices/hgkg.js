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
const legacy = __importStar(require("../lib/legacy"));
const tuya = __importStar(require("../lib/tuya"));
const e = exposes.presets;
const ea = exposes.access;
const definitions = [
    {
        fingerprint: [{ modelID: 'TS0601', manufacturerName: '_TZE200_dzuqwsyg' }],
        model: 'BAC-002-ALZB',
        vendor: 'HKGK',
        description: 'BAC series thermostat',
        fromZigbee: [
            legacy.fz.moes_thermostat,
            fromZigbee_1.default.ignore_basic_report,
            fromZigbee_1.default.ignore_tuya_set_time,
        ],
        onEvent: tuya.onEventSetLocalTime,
        toZigbee: [
            legacy.tz.moes_thermostat_child_lock,
            legacy.tz.moes_thermostat_current_heating_setpoint,
            legacy.tz.moes_thermostat_sensor,
            legacy.tz.moes_thermostat_calibration,
            legacy.tz.tuya_thermostat_schedule,
            legacy.tz.tuya_thermostat_week,
            legacy.tz.tuya_thermostat_schedule_programming_mode,
            legacy.tz.tuya_thermostat_bac_fan_mode,
            legacy.tz.moes_thermostat_mode,
            legacy.tz.moes_thermostat_mode2,
        ],
        exposes: [
            // e.switch(),
            e.child_lock(),
            // e.deadzone_temperature(),
            e.climate()
                .withSetpoint('current_heating_setpoint', 5, 45, 0.5, ea.STATE_SET)
                .withLocalTemperature(ea.STATE)
                .withLocalTemperatureCalibration(-10, 10, 0.1, ea.STATE_SET)
                .withSystemMode(['off', 'cool', 'heat', 'fan_only'], ea.STATE_SET)
                // .withRunningState(['off','on'], ea.STATE)
                .withPreset(['hold', 'program'])
                .withFanMode(['low', 'medium', 'high', 'auto'], ea.STATE_SET),
            e.temperature_sensor_select(['IN', 'AL', 'OU']),
            e.week(),
            e.text('workdays_schedule', ea.STATE_SET)
                .withDescription('Workdays schedule, 6 entries max, example: "00:20/5°C 01:20/5°C 6:59/15°C 18:00/5°C 20:00/5°C 23:30/5°C"'),
            e.text('holidays_schedule', ea.STATE_SET)
                .withDescription('Holidays schedule, 6 entries max, example: "00:20/5°C 01:20/5°C 6:59/15°C 18:00/5°C 20:00/5°C 23:30/5°C"'),
        ],
    },
];
exports.default = definitions;
module.exports = definitions;
//# sourceMappingURL=hgkg.js.map