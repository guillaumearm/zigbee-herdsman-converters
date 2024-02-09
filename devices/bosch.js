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
const modernExtend_1 = require("../lib/modernExtend");
const zigbee_herdsman_1 = require("zigbee-herdsman");
const exposes = __importStar(require("../lib/exposes"));
const fromZigbee_1 = __importDefault(require("../converters/fromZigbee"));
const toZigbee_1 = __importDefault(require("../converters/toZigbee"));
const reporting = __importStar(require("../lib/reporting"));
const utils = __importStar(require("../lib/utils"));
const constants = __importStar(require("../lib/constants"));
const ota = __importStar(require("../lib/ota"));
const globalStore = __importStar(require("../lib/store"));
const e = exposes.presets;
const ea = exposes.access;
const manufacturerOptions = { manufacturerCode: zigbee_herdsman_1.Zcl.ManufacturerCode.ROBERT_BOSCH_GMBH };
const sirenVolume = {
    'low': 0x01,
    'medium': 0x02,
    'high': 0x03,
};
const sirenLight = {
    'only_light': 0x00,
    'only_siren': 0x01,
    'siren_and_light': 0x02,
};
const outdoorSirenState = {
    'ON': 0x07,
    'OFF': 0x00,
};
const sirenPowerSupply = {
    'solar_panel': 0x01,
    'ac_power_supply': 0x02,
    'dc_power_supply': 0x03,
};
// BMCT
const stateDeviceMode = {
    'light': 0x04,
    'shutter': 0x01,
    'disabled': 0x00,
};
// BMCT
const stateMotor = {
    'idle': 0x00,
    'opening': 0x01,
    'closing': 0x02,
};
// BMCT
const stateSwitchType = {
    'button': 0x01,
    'button_key_change': 0x02,
    'rocker_switch': 0x03,
    'rocker_switch_key_change': 0x04,
};
// Twinguard
const smokeSensitivity = {
    'low': 3,
    'medium': 2,
    'high': 1,
};
// Twinguard
const sirenState = {
    'stop': 0,
    'pre_alarm': 1,
    'fire': 2,
    'burglar': 3,
};
// Radiator Thermostat II
const operatingModes = {
    'automatic': 0,
    'manual': 1,
    'pause': 5,
};
// Radiator Thermostat II
const stateOffOn = {
    'OFF': 0,
    'ON': 1,
};
// Radiator Thermostat II
const displayOrientation = {
    'normal': 0,
    'flipped': 1,
};
// Radiator Thermostat II
const displayedTemperature = {
    'target': 0,
    'measured': 1,
};
// Smoke detector II bsd-2
const smokeDetectorAlarmState = {
    smoke_on: 46080,
    smoke_off: 0,
    intruder_on: 46081,
    intruder_off: 1,
};
// Radiator Thermostat II
const setpointSource = {
    'manual': 0,
    'schedule': 1,
    'external': 2,
};
// Radiator Thermostat II
const adaptationStatus = {
    'none': 0,
    'ready_to_calibrate': 1,
    'calibration_in_progress': 2,
    'error': 3,
    'success': 4,
};
// Universal Switch II
const buttonMap = {
    config_led_top_left_press: 0x10,
    config_led_top_right_press: 0x11,
    config_led_bottom_left_press: 0x12,
    config_led_bottom_right_press: 0x13,
    config_led_top_left_longpress: 0x20,
    config_led_top_right_longpress: 0x21,
    config_led_bottom_left_longpress: 0x22,
    config_led_bottom_right_longpress: 0x23,
};
// Universal Switch II
const labelShortPress = `Specifies LED color (rgb) and pattern on short press as hex string.
0-2: RGB value (e.g. ffffff = white)
3: Light position (01=top, 02=bottom, 00=full)
4-7: Durations for sequence fade-in -> on -> fade-out -> off (e.g. 01020102)
8: Number of Repetitions (01=1 to ff=255)
Example: ff1493000104010001`;
// Universal Switch II
const labelLongPress = `Specifies LED color (rgb) and pattern on long press as hex string.
0-2: RGB value (e.g. ffffff = white)
3: Light position (01=top, 02=bottom, 00=full)
4-7: Durations for sequence fade-in -> on -> fade-out -> off (e.g. 01020102)
8: Number of Repetitions (01=1 to ff=255)
Example: ff4200000502050001`;
// Universal Switch II
const labelConfirmation = `Specifies LED color (rgb) and pattern of the confirmation response as hex string.
0-2: RGB value (e.g. ffffff = white)
3: Light position (01=top, 02=bottom, 00=full)
4-7: Durations for sequence fade-in -> on -> fade-out -> off (e.g. 01020102)
8: Number of Repetitions (01=1 to ff=255)
Example: 30ff00000102010001`;
const tzLocal = {
    alarm_state: {
        key: ['intruder_alarm_state', 'smoke_alarm_state'],
        convertSet: async (entity, key, value, meta) => {
            const dataToSend = { cluster: 'ssIasZone', command: 128, payload: { data: '' } };
            if (key === 'smoke_alarm_state' || key === 'intruder_alarm_state') {
                let convertedValue = '';
                if (key === 'smoke_alarm_state') {
                    if (value === 'ON') {
                        convertedValue = smokeDetectorAlarmState.smoke_on.toString();
                    }
                    if (value === 'OFF') {
                        convertedValue = smokeDetectorAlarmState.smoke_off.toString();
                    }
                }
                if (key === 'intruder_alarm_state') {
                    if (value === 'ON') {
                        convertedValue = smokeDetectorAlarmState.intruder_on.toString();
                    }
                    if (value === 'OFF') {
                        convertedValue = smokeDetectorAlarmState.intruder_off.toString();
                    }
                }
                dataToSend.payload.data = convertedValue;
            }
            //
            // the data of the payload can either be decimal:
            // 1: this disables the intruder alarm state
            // 46081: this enables the intruder alert siren
            // 256: this enables the smoke test alarm siren
            const endpoint = meta.device.getEndpoint(1);
            await endpoint.command(dataToSend.cluster, dataToSend.command, dataToSend.payload, {
                ...manufacturerOptions,
                ...utils.getOptions(meta.mapped, entity),
            });
            return { state: { alarm_state: dataToSend.payload.data } };
        },
        convertGet: async (entity, key, meta) => {
            switch (key) {
                case 'smoke_alarm_state':
                    await entity.read('ssIasZone', [0xf0], manufacturerOptions);
                    break;
                case 'intruder_alarm_state':
                    await entity.read('ssIasZone', [0xf0], manufacturerOptions);
                    break;
                default: // Unknown key
                    throw new Error(`Unhandled key toZigbee.rbshoszbeu.convertGet ${key}`);
            }
        },
    },
    rbshoszbeu: {
        key: ['light_delay', 'siren_delay', 'light_duration', 'siren_duration', 'siren_volume', 'alarm_state', 'power_source', 'siren_and_light'],
        convertSet: async (entity, key, value, meta) => {
            if (key === 'light_delay') {
                const index = value;
                await entity.write(0x0502, { 0xa004: { value: index, type: 0x21 } }, manufacturerOptions);
                return { state: { light_delay: value } };
            }
            if (key === 'siren_delay') {
                const index = value;
                await entity.write(0x0502, { 0xa003: { value: index, type: 0x21 } }, manufacturerOptions);
                return { state: { siren_delay: value } };
            }
            if (key === 'light_duration') {
                const index = value;
                await entity.write(0x0502, { 0xa005: { value: index, type: 0x20 } }, manufacturerOptions);
                return { state: { light_duration: value } };
            }
            if (key === 'siren_duration') {
                const index = value;
                await entity.write(0x0502, { 0xa000: { value: index, type: 0x20 } }, manufacturerOptions);
                return { state: { siren_duration: value } };
            }
            if (key === 'siren_and_light') {
                const index = utils.getFromLookup(value, sirenLight);
                await entity.write(0x0502, { 0xa001: { value: index, type: 0x20 } }, manufacturerOptions);
                return { state: { siren_and_light: value } };
            }
            if (key === 'siren_volume') {
                const index = utils.getFromLookup(value, sirenVolume);
                await entity.write(0x0502, { 0xa002: { value: index, type: 0x20 } }, manufacturerOptions);
                return { state: { siren_volume: value } };
            }
            if (key === 'power_source') {
                const index = utils.getFromLookup(value, sirenPowerSupply);
                await entity.write(0x0001, { 0xa002: { value: index, type: 0x20 } }, manufacturerOptions);
                return { state: { power_source: value } };
            }
            if (key === 'alarm_state') {
                const endpoint = meta.device.getEndpoint(1);
                const index = utils.getFromLookup(value, outdoorSirenState);
                if (index == 0) {
                    await endpoint.command(0x0502, 0xf0, { data: 0 }, manufacturerOptions);
                    return { state: { alarm_state: value } };
                }
                else {
                    await endpoint.command(0x0502, 0xf0, { data: 7 }, manufacturerOptions);
                    return { state: { alarm_state: value } };
                }
            }
        },
        convertGet: async (entity, key, meta) => {
            switch (key) {
                case 'light_delay':
                    await entity.read(0x0502, [0xa004], manufacturerOptions);
                    break;
                case 'siren_delay':
                    await entity.read(0x0502, [0xa003], manufacturerOptions);
                    break;
                case 'light_duration':
                    await entity.read(0x0502, [0xa005], manufacturerOptions);
                    break;
                case 'siren_duration':
                    await entity.read(0x0502, [0xa000], manufacturerOptions);
                    break;
                case 'siren_and_light':
                    await entity.read(0x0502, [0xa001], manufacturerOptions);
                    break;
                case 'siren_volume':
                    await entity.read(0x0502, [0xa002], manufacturerOptions);
                    break;
                case 'alarm_state':
                    await entity.read(0x0502, [0xf0], manufacturerOptions);
                    break;
                default: // Unknown key
                    throw new Error(`Unhandled key toZigbee.rbshoszbeu.convertGet ${key}`);
            }
        },
    },
    bmct: {
        key: [
            'device_mode',
            'switch_type',
            'child_lock',
            'calibration', 'calibration_closing_time', 'calibration_opening_time',
            'state',
        ],
        convertSet: async (entity, key, value, meta) => {
            if (key === 'state') {
                if ('ID' in entity && entity.ID === 1) {
                    await toZigbee_1.default.cover_state.convertSet(entity, key, value, meta);
                }
                else {
                    await toZigbee_1.default.on_off.convertSet(entity, key, value, meta);
                }
            }
            if (key === 'device_mode') {
                const index = utils.getFromLookup(value, stateDeviceMode);
                await entity.write('manuSpecificBosch10', { deviceMode: index });
                await entity.read('manuSpecificBosch10', ['deviceMode']);
                return { state: { device_mode: value } };
            }
            if (key === 'switch_type') {
                const index = utils.getFromLookup(value, stateSwitchType);
                await entity.write('manuSpecificBosch10', { switchType: index });
                return { state: { switch_type: value } };
            }
            if (key === 'child_lock') {
                const index = utils.getFromLookup(value, stateOffOn);
                await entity.write('manuSpecificBosch10', { childLock: index });
                return { state: { child_lock: value } };
            }
            if (key === 'calibration_opening_time') {
                const number = utils.toNumber(value, 'calibration_opening_time');
                const index = number * 10;
                await entity.write('manuSpecificBosch10', { calibrationOpeningTime: index });
                return { state: { calibration_opening_time: number } };
            }
            if (key === 'calibration_closing_time') {
                const number = utils.toNumber(value, 'calibration_closing_time');
                const index = number * 10;
                await entity.write('manuSpecificBosch10', { calibrationClosingTime: index });
                return { state: { calibration_closing_time: number } };
            }
        },
        convertGet: async (entity, key, meta) => {
            switch (key) {
                case 'state':
                    await entity.read('genOnOff', ['onOff']);
                    break;
                case 'device_mode':
                    await entity.read('manuSpecificBosch10', ['deviceMode']);
                    break;
                case 'switch_type':
                    await entity.read('manuSpecificBosch10', ['switchType']);
                    break;
                case 'child_lock':
                    await entity.read('manuSpecificBosch10', ['childLock']);
                    break;
                case 'calibration_opening_time':
                    await entity.read('manuSpecificBosch10', ['calibrationOpeningTime']);
                    break;
                case 'calibration_closing_time':
                    await entity.read('manuSpecificBosch10', ['calibrationClosingTime']);
                    break;
                default: // Unknown key
                    throw new Error(`Unhandled key toZigbee.bcmt.convertGet ${key}`);
            }
        },
    },
    bwa1: {
        key: ['alarm_on_motion', 'test'],
        convertSet: async (entity, key, value, meta) => {
            if (key === 'alarm_on_motion') {
                const index = utils.getFromLookup(value, stateOffOn);
                await entity.write(0xFCAC, { 0x0003: { value: index, type: 0x10 } }, manufacturerOptions);
                return { state: { alarm_on_motion: value } };
            }
        },
        convertGet: async (entity, key, meta) => {
            switch (key) {
                case 'alarm_on_motion':
                    await entity.read(0xFCAC, [0x0003], manufacturerOptions);
                    break;
                default: // Unknown key
                    throw new Error(`Unhandled key toZigbee.bosch_twinguard.convertGet ${key}`);
            }
        },
    },
    bosch_thermostat: {
        key: ['window_open', 'boost', 'system_mode', 'pi_heating_demand', 'remote_temperature', 'valve_adapt_process'],
        convertSet: async (entity, key, value, meta) => {
            if (key === 'window_open') {
                const index = utils.getFromLookup(value, stateOffOn);
                await entity.write('hvacThermostat', { 0x4042: { value: index, type: zigbee_herdsman_1.Zcl.DataType.enum8 } }, manufacturerOptions);
                return { state: { window_open: value } };
            }
            if (key === 'boost') {
                const index = utils.getFromLookup(value, stateOffOn);
                await entity.write('hvacThermostat', { 0x4043: { value: index, type: zigbee_herdsman_1.Zcl.DataType.enum8 } }, manufacturerOptions);
                return { state: { boost: value } };
            }
            if (key === 'system_mode') {
                // Map system_mode (Off/Auto/Heat) to Bosch operating mode
                utils.assertString(value, key);
                value = value.toLowerCase();
                let opMode = operatingModes.manual; // OperatingMode 1 = Manual (Default)
                if (value == 'off') {
                    opMode = operatingModes.pause; // OperatingMode 5 = Pause
                }
                else if (value == 'auto') {
                    opMode = operatingModes.automatic; // OperatingMode 0 = Automatic
                }
                await entity.write('hvacThermostat', { 0x4007: { value: opMode, type: zigbee_herdsman_1.Zcl.DataType.enum8 } }, manufacturerOptions);
                return { state: { system_mode: value } };
            }
            if (key === 'pi_heating_demand') {
                let demand = utils.toNumber(value, key);
                demand = utils.numberWithinRange(demand, 0, 100);
                await entity.write('hvacThermostat', { 0x4020: { value: demand, type: zigbee_herdsman_1.Zcl.DataType.enum8 } }, manufacturerOptions);
                return { state: { pi_heating_demand: demand } };
            }
            if (key === 'remote_temperature') {
                let temperature = utils.toNumber(value, key);
                temperature = utils.precisionRound(temperature, 1);
                const convertedTemperature = utils.precisionRound(temperature * 100, 0);
                await entity.write('hvacThermostat', { 0x4040: { value: convertedTemperature, type: zigbee_herdsman_1.Zcl.DataType.int16 } }, manufacturerOptions);
                return { state: { remote_temperature: temperature } };
            }
            if (key === 'valve_adapt_process') {
                if (value == true) {
                    const adaptStatus = utils.getFromLookup(meta.state.valve_adapt_status, adaptationStatus);
                    switch (adaptStatus) {
                        case adaptationStatus.ready_to_calibrate:
                        case adaptationStatus.error:
                            await entity.command('hvacThermostat', 'boschCalibrateValve', {}, manufacturerOptions);
                            break;
                        default:
                            throw new Error('Valve adaptation process not possible right now.');
                    }
                }
                return { state: { valve_adapt_process: value } };
            }
        },
        convertGet: async (entity, key, meta) => {
            switch (key) {
                case 'window_open':
                    await entity.read('hvacThermostat', [0x4042], manufacturerOptions);
                    break;
                case 'boost':
                    await entity.read('hvacThermostat', [0x4043], manufacturerOptions);
                    break;
                case 'system_mode':
                    await entity.read('hvacThermostat', [0x4007], manufacturerOptions);
                    break;
                case 'pi_heating_demand':
                    await entity.read('hvacThermostat', [0x4020], manufacturerOptions);
                    break;
                case 'remote_temperature':
                    await entity.read('hvacThermostat', [0x4040], manufacturerOptions);
                    break;
                case 'valve_adapt_process':
                    // Reads the current valve adaptation status as it depends solely on it
                    await entity.read('hvacThermostat', [0x4022], manufacturerOptions);
                    break;
                default: // Unknown key
                    throw new Error(`Unhandled key toZigbee.bosch_thermostat.convertGet ${key}`);
            }
        },
    },
    bosch_userInterface: {
        key: ['display_orientation', 'display_ontime', 'display_brightness', 'child_lock', 'displayed_temperature'],
        convertSet: async (entity, key, value, meta) => {
            if (key === 'display_orientation') {
                const index = utils.getFromLookup(value, displayOrientation);
                await entity.write('hvacUserInterfaceCfg', { 0x400b: { value: index, type: zigbee_herdsman_1.Zcl.DataType.uint8 } }, manufacturerOptions);
                return { state: { display_orientation: value } };
            }
            if (key === 'display_ontime') {
                let onTime = utils.toNumber(value, key);
                onTime = utils.numberWithinRange(onTime, 5, 30);
                await entity.write('hvacUserInterfaceCfg', { 0x403a: { value: onTime, type: zigbee_herdsman_1.Zcl.DataType.enum8 } }, manufacturerOptions);
                return { state: { display_onTime: onTime } };
            }
            if (key === 'display_brightness') {
                let brightness = utils.toNumber(value, key);
                brightness = utils.numberWithinRange(brightness, 0, 10);
                await entity.write('hvacUserInterfaceCfg', { 0x403b: { value: brightness, type: zigbee_herdsman_1.Zcl.DataType.enum8 } }, manufacturerOptions);
                return { state: { display_brightness: brightness } };
            }
            if (key === 'child_lock') {
                const keypadLockout = Number(value === 'LOCK');
                await entity.write('hvacUserInterfaceCfg', { keypadLockout });
                return { state: { child_lock: value } };
            }
            if (key === 'displayed_temperature') {
                const index = utils.getFromLookup(value, displayedTemperature);
                await entity.write('hvacUserInterfaceCfg', { 0x4039: { value: index, type: zigbee_herdsman_1.Zcl.DataType.enum8 } }, manufacturerOptions);
                return { state: { displayed_temperature: value } };
            }
        },
        convertGet: async (entity, key, meta) => {
            switch (key) {
                case 'display_orientation':
                    await entity.read('hvacUserInterfaceCfg', [0x400b], manufacturerOptions);
                    break;
                case 'display_ontime':
                    await entity.read('hvacUserInterfaceCfg', [0x403a], manufacturerOptions);
                    break;
                case 'display_brightness':
                    await entity.read('hvacUserInterfaceCfg', [0x403b], manufacturerOptions);
                    break;
                case 'child_lock':
                    await entity.read('hvacUserInterfaceCfg', ['keypadLockout']);
                    break;
                case 'displayed_temperature':
                    await entity.read('hvacUserInterfaceCfg', [0x4039], manufacturerOptions);
                    break;
                default: // Unknown key
                    throw new Error(`Unhandled key toZigbee.bosch_userInterface.convertGet ${key}`);
            }
        },
    },
    bosch_twinguard: {
        key: ['sensitivity', 'pre_alarm', 'self_test', 'alarm', 'heartbeat'],
        convertSet: async (entity, key, value, meta) => {
            if (key === 'sensitivity') {
                const index = utils.getFromLookup(value, smokeSensitivity);
                await entity.write('manuSpecificBosch', { 0x4003: { value: index, type: 0x21 } }, manufacturerOptions);
                return { state: { sensitivity: value } };
            }
            if (key === 'pre_alarm') {
                const index = utils.getFromLookup(value, stateOffOn);
                await entity.write('manuSpecificBosch5', { 0x4001: { value: index, type: 0x18 } }, manufacturerOptions);
                return { state: { pre_alarm: value } };
            }
            if (key === 'heartbeat') {
                const endpoint = meta.device.getEndpoint(12);
                const index = utils.getFromLookup(value, stateOffOn);
                await endpoint.write('manuSpecificBosch7', { 0x5005: { value: index, type: 0x18 } }, manufacturerOptions);
                return { state: { heartbeat: value } };
            }
            if (key === 'self_test') {
                if (value) {
                    await entity.command('manuSpecificBosch', 'initiateTestMode', manufacturerOptions);
                }
            }
            if (key === 'alarm') {
                const endpoint = meta.device.getEndpoint(12);
                const index = utils.getFromLookup(value, sirenState);
                utils.assertEndpoint(entity);
                if (index == 0) {
                    await entity.commandResponse('genAlarms', 'alarm', { alarmcode: 0x16, clusterid: 0xe000 }, { direction: 1 });
                    await entity.commandResponse('genAlarms', 'alarm', { alarmcode: 0x14, clusterid: 0xe000 }, { direction: 1 });
                    await endpoint.command('manuSpecificBosch8', 'burglarAlarm', { data: 0 }, manufacturerOptions);
                }
                else if (index == 1) {
                    await entity.commandResponse('genAlarms', 'alarm', { alarmcode: 0x11, clusterid: 0xe000 }, { direction: 1 });
                    return { state: { siren_state: 'pre-alarm' } };
                }
                else if (index == 2) {
                    await entity.commandResponse('genAlarms', 'alarm', { alarmcode: 0x10, clusterid: 0xe000 }, { direction: 1 });
                    return { state: { siren_state: 'fire' } };
                }
                else if (index == 3) {
                    await endpoint.command('manuSpecificBosch8', 'burglarAlarm', { data: 1 }, manufacturerOptions);
                }
            }
        },
        convertGet: async (entity, key, meta) => {
            switch (key) {
                case 'sensitivity':
                    await entity.read('manuSpecificBosch', [0x4003], manufacturerOptions);
                    break;
                case 'pre_alarm':
                    await entity.read('manuSpecificBosch5', [0x4001], manufacturerOptions);
                    break;
                case 'heartbeat':
                    await meta.device.getEndpoint(12).read('manuSpecificBosch7', [0x5005], manufacturerOptions);
                    break;
                default: // Unknown key
                    throw new Error(`Unhandled key toZigbee.bosch_twinguard.convertGet ${key}`);
            }
        },
    },
    bhius_config: {
        key: Object.keys(buttonMap),
        convertGet: async (entity, key, meta) => {
            if (!buttonMap.hasOwnProperty(key)) {
                throw new Error(`Unknown key ${key}`);
            }
            await entity.read('manuSpecificBosch9', [buttonMap[key]], manufacturerOptions);
        },
        convertSet: async (entity, key, value, meta) => {
            if (!buttonMap.hasOwnProperty(key)) {
                return;
            }
            const buffer = Buffer.from(value, 'hex');
            if (buffer.length !== 9)
                throw new Error(`Invalid configuration length: ${buffer.length} (should be 9)`);
            const payload = {};
            payload[buttonMap[key]] = { value: buffer, type: 65 };
            await entity.write('manuSpecificBosch9', payload, manufacturerOptions);
            const result = {};
            result[key] = value;
            return { state: result };
        },
    },
};
const fzLocal = {
    bmct: {
        cluster: 'manuSpecificBosch10',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            const data = msg.data;
            if (data.hasOwnProperty('deviceMode')) {
                result.device_mode = Object.keys(stateDeviceMode).find((key) => stateDeviceMode[key] === msg.data['deviceMode']);
                const deviceMode = msg.data['deviceMode'];
                if (deviceMode !== meta.device.meta.deviceMode) {
                    meta.device.meta.deviceMode = deviceMode;
                    meta.deviceExposesChanged();
                }
            }
            if (data.hasOwnProperty('switchType')) {
                result.switch_type = Object.keys(stateSwitchType).find((key) => stateSwitchType[key] === msg.data['switchType']);
            }
            if (data.hasOwnProperty('calibrationOpeningTime')) {
                result.calibration_opening_time = msg.data['calibrationOpeningTime'] / 10;
            }
            if (data.hasOwnProperty('calibrationClosingTime')) {
                result.calibration_closing_time = msg.data['calibrationClosingTime'] / 10;
            }
            if (data.hasOwnProperty('childLock')) {
                const property = utils.postfixWithEndpointName('child_lock', msg, model, meta);
                result[property] = msg.data['childLock'] === 1 ? 'ON' : 'OFF';
            }
            if (data.hasOwnProperty('motorState')) {
                result.motor_state = Object.keys(stateMotor).find((key) => stateMotor[key] === msg.data['motorState']);
            }
            return result;
        },
    },
    bwa1_alarm_on_motion: {
        cluster: '64684',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            const data = msg.data;
            if (data.hasOwnProperty(0x0003)) {
                result.alarm_on_motion = (Object.keys(stateOffOn)[msg.data[0x0003]]);
            }
            return result;
        },
    },
    bosch_contact: {
        cluster: 'ssIasZone',
        type: 'commandStatusChangeNotification',
        convert: (model, msg, publish, options, meta) => {
            const zoneStatus = msg.data.zonestatus;
            const lookup = { 0: 'none', 1: 'single', 2: 'long' };
            const result = {
                contact: !((zoneStatus & 1) > 0),
                vibration: (zoneStatus & 1 << 1) > 0,
                battery_low: (zoneStatus & 1 << 3) > 0,
                action: lookup[(zoneStatus >> 11) & 3],
            };
            if (result.action === 'none')
                delete result.action;
            return result;
        },
    },
    bosch_ignore_dst: {
        cluster: 'genTime',
        type: 'read',
        convert: async (model, msg, publish, options, meta) => {
            if (msg.data.includes('dstStart', 'dstEnd', 'dstShift')) {
                const response = {
                    'dstStart': { attribute: 0x0003, status: zigbee_herdsman_1.Zcl.Status.SUCCESS, value: 0x00 },
                    'dstEnd': { attribute: 0x0004, status: zigbee_herdsman_1.Zcl.Status.SUCCESS, value: 0x00 },
                    'dstShift': { attribute: 0x0005, status: zigbee_herdsman_1.Zcl.Status.SUCCESS, value: 0x00 },
                };
                await msg.endpoint.readResponse(msg.cluster, msg.meta.zclTransactionSequenceNumber, response);
            }
        },
    },
    bosch_thermostat: {
        cluster: 'hvacThermostat',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            const data = msg.data;
            if (data.hasOwnProperty(0x4040)) {
                result.remote_temperature = utils.precisionRound(data[0x4040] / 100, 1);
            }
            if (data.hasOwnProperty(0x4042)) {
                result.window_open = (Object.keys(stateOffOn)[data[0x4042]]);
            }
            if (data.hasOwnProperty(0x4043)) {
                result.boost = (Object.keys(stateOffOn)[data[0x4043]]);
            }
            if (data.hasOwnProperty(0x4007)) {
                const opModes = { 0: 'auto', 1: 'heat', 2: 'unknown_2', 3: 'unknown_3', 4: 'unknown_4', 5: 'off' };
                result.system_mode = opModes[data[0x4007]];
            }
            if (data.hasOwnProperty(0x4020)) {
                const demand = data[0x4020];
                result.pi_heating_demand = demand;
                result.running_state = demand > 0 ? 'heat' : 'idle';
            }
            if (data.hasOwnProperty(0x4022)) {
                result.valve_adapt_status = utils.getFromLookupByValue(data[0x4022], adaptationStatus);
                if (data[0x4022] === adaptationStatus.calibration_in_progress) {
                    result.valve_adapt_process = true;
                }
                else {
                    result.valve_adapt_process = false;
                }
            }
            return result;
        },
    },
    bosch_userInterface: {
        cluster: 'hvacUserInterfaceCfg',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            const data = msg.data;
            if (data.hasOwnProperty(0x400b)) {
                result.display_orientation = (Object.keys(displayOrientation)[data[0x400b]]);
            }
            if (data.hasOwnProperty(0x4039)) {
                result.displayed_temperature = (Object.keys(displayedTemperature)[data[0x4039]]);
            }
            if (data.hasOwnProperty(0x403a)) {
                result.display_ontime = data[0x403a];
            }
            if (data.hasOwnProperty(0x403b)) {
                result.display_brightness = data[0x403b];
            }
            if (data.hasOwnProperty('keypadLockout')) {
                result.child_lock = (data['keypadLockout'] == 1 ? 'LOCK' : 'UNLOCK');
            }
            return result;
        },
    },
    bosch_twinguard_sensitivity: {
        cluster: 'manuSpecificBosch',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data.hasOwnProperty(0x4003)) {
                result.sensitivity = (Object.keys(smokeSensitivity)[msg.data[0x4003]]);
            }
            return result;
        },
    },
    bosch_twinguard_measurements: {
        cluster: 'manuSpecificBosch3',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data.hasOwnProperty('humidity')) {
                result.humidity = msg.data['humidity'] / 100.0;
            }
            if (msg.data.hasOwnProperty('airpurity')) {
                result.co2 = msg.data['airpurity'] * 10.0 + 500.0;
            }
            if (msg.data.hasOwnProperty('temperature')) {
                result.temperature = msg.data['temperature'] / 100.0;
            }
            if (msg.data.hasOwnProperty('illuminance_lux')) {
                result.illuminance_lux = msg.data['illuminance_lux'] / 2.0;
            }
            if (msg.data.hasOwnProperty('battery')) {
                result.battery = msg.data['battery'] / 2.0;
            }
            return result;
        },
    },
    bosch_twinguard_pre_alarm: {
        cluster: 'manuSpecificBosch5',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data.hasOwnProperty('pre_alarm')) {
                result.pre_alarm = (Object.keys(stateOffOn)[msg.data['pre_alarm']]);
            }
            return result;
        },
    },
    bosch_twinguard_heartbeat: {
        cluster: 'manuSpecificBosch7',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data.hasOwnProperty('heartbeat')) {
                result.heartbeat = (Object.keys(stateOffOn)[msg.data['heartbeat']]);
            }
            return result;
        },
    },
    bosch_twinguard_alarm_state: {
        cluster: 'manuSpecificBosch8',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            const lookup = {
                0x00200020: 'clear',
                0x01200020: 'self_test',
                0x02200020: 'burglar',
                0x00200082: 'pre-alarm',
                0x00200081: 'fire',
                0x00200040: 'silenced',
            };
            if (msg.data.hasOwnProperty('alarm_status')) {
                result.self_test = (msg.data['alarm_status'] & 1 << 24) > 0;
                result.smoke = (msg.data['alarm_status'] & 1 << 7) > 0;
                result.siren_state = lookup[msg.data['alarm_status']];
            }
            return result;
        },
    },
    bosch_twinguard_smoke_alarm_state: {
        cluster: 'genAlarms',
        type: ['commandAlarm', 'readResponse'],
        convert: async (model, msg, publish, options, meta) => {
            const result = {};
            const lookup = {
                0x10: 'fire',
                0x11: 'pre-alarm',
                0x14: 'clear',
                0x16: 'silenced',
            };
            result.siren_state = lookup[msg.data.alarmcode];
            if (msg.data.alarmcode == 0x10 || msg.data.alarmcode == 0x11) {
                await msg.endpoint.commandResponse('genAlarms', 'alarm', { alarmcode: msg.data.alarmcode, clusterid: 0xe000 }, { direction: 1 });
            }
            return result;
        },
    },
    bhius_button_press: {
        cluster: 'manuSpecificBosch9',
        type: 'raw',
        options: [e.text('led_response', ea.ALL).withLabel('LED config (confirmation response)').withDescription(labelConfirmation)],
        convert: async (model, msg, publish, options, meta) => {
            const sequenceNumber = msg.data.readUInt8(3);
            const buttonId = msg.data.readUInt8(4);
            const longPress = msg.data.readUInt8(5);
            const duration = msg.data.readUInt16LE(6);
            let buffer;
            if (options.hasOwnProperty('led_response')) {
                buffer = Buffer.from(options.led_response, 'hex');
                if (buffer.length !== 9) {
                    meta.logger.error(`Invalid length of led_response: ${buffer.length} (should be 9)`);
                    buffer = Buffer.from('30ff00000102010001', 'hex');
                }
            }
            else {
                buffer = Buffer.from('30ff00000102010001', 'hex');
            }
            if (utils.hasAlreadyProcessedMessage(msg, model, sequenceNumber))
                return;
            const buttons = { 0: 'top_left', 1: 'top_right', 2: 'bottom_left', 3: 'bottom_right' };
            let command = '';
            if (buttonId in buttons) {
                if (longPress && duration > 0) {
                    if (globalStore.hasValue(msg.endpoint, buttons[buttonId]))
                        return;
                    globalStore.putValue(msg.endpoint, buttons[buttonId], duration);
                    command = 'longpress';
                }
                else {
                    globalStore.clearValue(msg.endpoint, buttons[buttonId]);
                    command = longPress ? 'longpress_release' : 'release';
                    msg.endpoint.command('manuSpecificBosch9', 'confirmButtonPressed', { data: buffer }, { sendPolicy: 'immediate' })
                        .catch((error) => { });
                }
                return { action: `button_${buttons[buttonId]}_${command}` };
            }
            else {
                meta.logger.error(`Received message with unknown command ID ${buttonId}. Data: 0x${msg.data.toString('hex')}`);
            }
        },
    },
    bhius_config: {
        cluster: 'manuSpecificBosch9',
        type: ['attributeReport', 'readResponse'],
        convert: async (model, msg, publish, options, meta) => {
            const result = {};
            for (const id of Object.values(buttonMap)) {
                if (msg.data.hasOwnProperty(id)) {
                    result[Object.keys(buttonMap).find((key) => buttonMap[key] === id)] = msg.data[id].toString('hex');
                }
            }
            return result;
        },
    },
};
const definitions = [
    {
        zigbeeModel: ['RBSH-OS-ZB-EU'],
        model: 'BSIR-EZ',
        vendor: 'Bosch',
        description: 'Outdoor siren',
        fromZigbee: [fromZigbee_1.default.ias_alarm_only_alarm_1, fromZigbee_1.default.battery, fromZigbee_1.default.power_source],
        toZigbee: [tzLocal.rbshoszbeu, toZigbee_1.default.warning],
        meta: { battery: { voltageToPercentage: { min: 2500, max: 4200 } } },
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg', 'ssIasZone', 'ssIasWd', 'genBasic']);
            await reporting.batteryVoltage(endpoint);
            await endpoint.read(0x0502, [0xa000, 0xa001, 0xa002, 0xa003, 0xa004, 0xa005], manufacturerOptions);
            await endpoint.unbind('genPollCtrl', coordinatorEndpoint);
        },
        exposes: [
            e.binary('alarm_state', ea.ALL, 'ON', 'OFF').withDescription('Alarm turn ON/OFF'),
            e.numeric('light_delay', ea.ALL).withValueMin(0).withValueMax(30).withValueStep(1)
                .withUnit('s').withDescription('Flashing light delay').withUnit('s'),
            e.numeric('siren_delay', ea.ALL).withValueMin(0).withValueMax(30).withValueStep(1)
                .withUnit('s').withDescription('Siren alarm delay').withUnit('s'),
            e.numeric('siren_duration', ea.ALL).withValueMin(1).withValueMax(15).withValueStep(1)
                .withUnit('m').withDescription('Duration of the alarm siren').withUnit('m'),
            e.numeric('light_duration', ea.ALL).withValueMin(1).withValueMax(15).withValueStep(1)
                .withUnit('m').withDescription('Duration of the alarm light').withUnit('m'),
            e.enum('siren_volume', ea.ALL, Object.keys(sirenVolume)).withDescription('Volume of the alarm'),
            e.enum('siren_and_light', ea.ALL, Object.keys(sirenLight)).withDescription('Siren and Light behaviour during alarm '),
            e.enum('power_source', ea.ALL, Object.keys(sirenPowerSupply)).withDescription('Siren power source'),
            e.warning()
                .removeFeature('strobe_level')
                .removeFeature('strobe')
                .removeFeature('strobe_duty_cycle')
                .removeFeature('level')
                .removeFeature('duration'),
            e.test(), e.tamper(), e.battery(), e.battery_voltage(), e.battery_low(),
            e.binary('ac_status', ea.STATE, true, false).withDescription('Is the device plugged in'),
        ],
        extend: [
            (0, modernExtend_1.quirkCheckinInterval)(0),
        ],
    },
    {
        zigbeeModel: ['RBSH-WS-ZB-EU'],
        model: 'BWA-1',
        vendor: 'Bosch',
        description: 'Zigbee smart water leak detector',
        fromZigbee: [fromZigbee_1.default.ias_water_leak_alarm_1, fromZigbee_1.default.battery, fzLocal.bwa1_alarm_on_motion],
        toZigbee: [tzLocal.bwa1],
        meta: { battery: { voltageToPercentage: '3V_2500' } },
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg', 64684]);
            await reporting.batteryPercentageRemaining(endpoint);
            await reporting.batteryVoltage(endpoint);
            await endpoint.configureReporting(0xFCAC, [{
                    attribute: { ID: 0x0003, type: zigbee_herdsman_1.Zcl.DataType.boolean },
                    minimumReportInterval: 0,
                    maximumReportInterval: constants.repInterval.HOUR,
                    reportableChange: 1,
                }], manufacturerOptions);
        },
        exposes: [
            e.water_leak(), e.battery(), e.tamper(),
            e.binary('alarm_on_motion', ea.ALL, 'ON', 'OFF').withDescription('Enable/Disable sound alarm on motion'),
        ],
    },
    {
        zigbeeModel: ['RBSH-SD-ZB-EU'],
        model: 'BSD-2',
        vendor: 'Bosch',
        description: 'Smoke alarm detector',
        fromZigbee: [fromZigbee_1.default.battery, fromZigbee_1.default.ias_smoke_alarm_1],
        toZigbee: [tzLocal.alarm_state],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg', 'ssIasZone', 'ssIasWd', 'genBasic', 64684]);
            await reporting.batteryPercentageRemaining(endpoint);
            device.save();
            await endpoint.unbind('genPollCtrl', coordinatorEndpoint);
        },
        exposes: [e.smoke(), e.battery(), e.battery_low(), e.test(),
            e.binary('intruder_alarm_state', ea.ALL, 'ON', 'OFF').withDescription('Toggle the intruder alarm on or off'),
            e.binary('smoke_alarm_state', ea.ALL, 'ON', 'OFF').withDescription('Toggle the smoke alarm on or off'),
        ],
    },
    {
        zigbeeModel: ['RFDL-ZB', 'RFDL-ZB-EU', 'RFDL-ZB-H', 'RFDL-ZB-K', 'RFDL-ZB-CHI', 'RFDL-ZB-MS', 'RFDL-ZB-ES', 'RFPR-ZB',
            'RFPR-ZB-EU', 'RFPR-ZB-CHI', 'RFPR-ZB-ES', 'RFPR-ZB-MS'],
        model: 'RADON TriTech ZB',
        vendor: 'Bosch',
        description: 'Wireless motion detector',
        fromZigbee: [fromZigbee_1.default.temperature, fromZigbee_1.default.battery, fromZigbee_1.default.ias_occupancy_alarm_1, fromZigbee_1.default.illuminance],
        toZigbee: [],
        meta: { battery: { voltageToPercentage: '3V_2500' } },
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['msTemperatureMeasurement', 'genPowerCfg']);
            await reporting.temperature(endpoint);
            await reporting.batteryVoltage(endpoint);
            await reporting.illuminance(endpoint);
        },
        exposes: [e.temperature(), e.battery(), e.occupancy(), e.battery_low(), e.tamper(), e.illuminance(), e.illuminance_lux()],
    },
    {
        zigbeeModel: ['ISW-ZPR1-WP13'],
        model: 'ISW-ZPR1-WP13',
        vendor: 'Bosch',
        description: 'Motion sensor',
        fromZigbee: [fromZigbee_1.default.temperature, fromZigbee_1.default.battery, fromZigbee_1.default.ias_occupancy_alarm_1, fromZigbee_1.default.ignore_iaszone_report],
        toZigbee: [],
        meta: { battery: { voltageToPercentage: '3V_2500' } },
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(5);
            await reporting.bind(endpoint, coordinatorEndpoint, ['msTemperatureMeasurement', 'genPowerCfg']);
            await reporting.temperature(endpoint);
            await reporting.batteryVoltage(endpoint);
        },
        exposes: [e.temperature(), e.battery(), e.occupancy(), e.battery_low(), e.tamper()],
    },
    {
        zigbeeModel: ['RBSH-TRV0-ZB-EU'],
        model: 'BTH-RA',
        vendor: 'Bosch',
        description: 'Radiator thermostat II',
        ota: ota.zigbeeOTA,
        fromZigbee: [
            fromZigbee_1.default.thermostat,
            fromZigbee_1.default.battery,
            fzLocal.bosch_ignore_dst,
            fzLocal.bosch_thermostat,
            fzLocal.bosch_userInterface,
        ],
        toZigbee: [
            toZigbee_1.default.thermostat_occupied_heating_setpoint,
            toZigbee_1.default.thermostat_local_temperature_calibration,
            toZigbee_1.default.thermostat_keypad_lockout,
            tzLocal.bosch_thermostat,
            tzLocal.bosch_userInterface,
        ],
        exposes: [
            e.climate()
                .withLocalTemperature(ea.STATE, 'Temperature used by the heating algorithm. ' +
                'This is the temperature measured on the device (by default) or the remote temperature (if set within the last 30 minutes).')
                .withSetpoint('occupied_heating_setpoint', 5, 30, 0.5)
                .withLocalTemperatureCalibration(-5, 5, 0.1)
                .withSystemMode(['off', 'heat'])
                .withPiHeatingDemand(ea.ALL)
                .withRunningState(['idle', 'heat'], ea.STATE),
            e.binary('boost', ea.ALL, 'ON', 'OFF')
                .withDescription('Activate boost heating'),
            e.binary('window_open', ea.ALL, 'ON', 'OFF')
                .withDescription('Window open'),
            e.enum('display_orientation', ea.ALL, Object.keys(displayOrientation))
                .withDescription('Display orientation')
                .withCategory('config'),
            e.numeric('remote_temperature', ea.ALL)
                .withValueMin(0)
                .withValueMax(35)
                .withValueStep(0.01)
                .withUnit('°C')
                .withDescription('Input for remote temperature sensor. ' +
                'This must be set at least every 30 minutes to prevent fallback to internal temperature reading!'),
            e.numeric('display_ontime', ea.ALL)
                .withValueMin(5)
                .withValueMax(30)
                .withDescription('Specifies the display on-time')
                .withCategory('config'),
            e.numeric('display_brightness', ea.ALL)
                .withValueMin(0)
                .withValueMax(10)
                .withDescription('Specifies the brightness level of the display')
                .withCategory('config'),
            e.enum('displayed_temperature', ea.ALL, Object.keys(displayedTemperature))
                .withDescription('Temperature displayed on the thermostat')
                .withCategory('config'),
            e.child_lock().setAccess('state', ea.ALL),
            e.battery(),
            e.enum('setpoint_change_source', ea.STATE, Object.keys(setpointSource))
                .withDescription('States where the current setpoint originated'),
            e.enum('valve_adapt_status', ea.STATE, Object.keys(adaptationStatus))
                .withLabel('Adaptation status')
                .withDescription('Specifies the current status of the valve adaptation')
                .withCategory('diagnostic'),
            e.binary('valve_adapt_process', ea.ALL, true, false)
                .withLabel('Trigger adaptation process')
                .withDescription('Trigger the valve adaptation process. Only possible when adaptation status ' +
                'is "ready_to_calibrate" or "error".')
                .withCategory('config'),
        ],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg', 'hvacThermostat', 'hvacUserInterfaceCfg']);
            await reporting.thermostatOccupiedHeatingSetpoint(endpoint, { min: 0, max: constants.repInterval.HOUR * 12, change: 1 });
            await reporting.thermostatTemperature(endpoint, { min: 30, max: 900, change: 20 });
            await reporting.thermostatKeypadLockMode(endpoint, { min: 0, max: constants.repInterval.HOUR * 12, change: null });
            await reporting.batteryPercentageRemaining(endpoint);
            // Report setpoint_change_source
            await endpoint.configureReporting('hvacThermostat', [{
                    attribute: 'setpointChangeSource',
                    minimumReportInterval: 0,
                    maximumReportInterval: constants.repInterval.HOUR * 12,
                    reportableChange: null,
                }]);
            // report operating_mode (system_mode)
            await endpoint.configureReporting('hvacThermostat', [{
                    attribute: { ID: 0x4007, type: zigbee_herdsman_1.Zcl.DataType.enum8 },
                    minimumReportInterval: 0,
                    maximumReportInterval: constants.repInterval.HOUR * 12,
                    reportableChange: null,
                }], manufacturerOptions);
            // report pi_heating_demand (valve opening)
            await endpoint.configureReporting('hvacThermostat', [{
                    attribute: { ID: 0x4020, type: zigbee_herdsman_1.Zcl.DataType.enum8 },
                    minimumReportInterval: 0,
                    maximumReportInterval: constants.repInterval.HOUR * 12,
                    reportableChange: null,
                }], manufacturerOptions);
            // Report valve_adapt_status (adaptation status)
            await endpoint.configureReporting('hvacThermostat', [{
                    attribute: { ID: 0x4022, type: zigbee_herdsman_1.Zcl.DataType.enum8 },
                    minimumReportInterval: 0,
                    maximumReportInterval: constants.repInterval.HOUR * 12,
                    reportableChange: null,
                }], manufacturerOptions);
            // report window_open
            await endpoint.configureReporting('hvacThermostat', [{
                    attribute: { ID: 0x4042, type: zigbee_herdsman_1.Zcl.DataType.enum8 },
                    minimumReportInterval: 0,
                    maximumReportInterval: constants.repInterval.HOUR * 12,
                    reportableChange: null,
                }], manufacturerOptions);
            // report boost as it's disabled by thermostat after 5 minutes
            await endpoint.configureReporting('hvacThermostat', [{
                    attribute: { ID: 0x4043, type: zigbee_herdsman_1.Zcl.DataType.enum8 },
                    minimumReportInterval: 0,
                    maximumReportInterval: constants.repInterval.HOUR * 12,
                    reportableChange: null,
                }], manufacturerOptions);
            await endpoint.read('hvacThermostat', ['localTemperatureCalibration', 'setpointChangeSource']);
            await endpoint.read('hvacThermostat', [0x4007, 0x4020, 0x4022, 0x4040, 0x4042, 0x4043], manufacturerOptions);
            await endpoint.read('hvacUserInterfaceCfg', ['keypadLockout']);
            await endpoint.read('hvacUserInterfaceCfg', [0x400b, 0x4039, 0x403a, 0x403b], manufacturerOptions);
        },
    },
    {
        zigbeeModel: ['RBSH-RTH0-BAT-ZB-EU'],
        model: 'BTH-RM',
        vendor: 'Bosch',
        description: 'Room thermostat II (Battery model)',
        fromZigbee: [fromZigbee_1.default.humidity, fromZigbee_1.default.thermostat, fromZigbee_1.default.battery, fzLocal.bosch_thermostat, fzLocal.bosch_userInterface],
        toZigbee: [toZigbee_1.default.thermostat_occupied_heating_setpoint, toZigbee_1.default.thermostat_local_temperature_calibration,
            toZigbee_1.default.thermostat_local_temperature, toZigbee_1.default.thermostat_keypad_lockout, toZigbee_1.default.thermostat_running_state,
            tzLocal.bosch_thermostat, tzLocal.bosch_userInterface],
        exposes: [
            e.climate()
                .withLocalTemperature()
                .withSetpoint('occupied_heating_setpoint', 5, 30, 0.5)
                .withLocalTemperatureCalibration(-12, 12, 0.5)
                .withSystemMode(['off', 'heat', 'auto'])
                .withRunningState(['idle', 'heat'], ea.STATE_GET),
            e.humidity(),
            e.binary('boost', ea.ALL, 'ON', 'OFF').withDescription('Activate Boost heating'),
            e.binary('window_open', ea.ALL, 'ON', 'OFF').withDescription('Window open'),
            e.child_lock().setAccess('state', ea.ALL),
            e.numeric('display_ontime', ea.ALL).withValueMin(5).withValueMax(30).withDescription('Specifies the display On-time'),
            e.numeric('display_brightness', ea.ALL).withValueMin(0).withValueMax(10).withDescription('Specifies the brightness value of the display'),
            e.battery_low(), e.battery_voltage(),
        ],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg', 'hvacThermostat', 'hvacUserInterfaceCfg', 'msRelativeHumidity']);
            await reporting.thermostatOccupiedHeatingSetpoint(endpoint);
            await reporting.thermostatKeypadLockMode(endpoint);
            await reporting.thermostatTemperature(endpoint);
            await reporting.humidity(endpoint);
            // report operating_mode (system_mode)
            await endpoint.configureReporting('hvacThermostat', [{
                    attribute: { ID: 0x4007, type: zigbee_herdsman_1.Zcl.DataType.enum8 },
                    minimumReportInterval: 0,
                    maximumReportInterval: constants.repInterval.HOUR,
                    reportableChange: 1,
                }], manufacturerOptions);
            // report window_open
            await endpoint.configureReporting('hvacThermostat', [{
                    attribute: { ID: 0x4042, type: zigbee_herdsman_1.Zcl.DataType.enum8 },
                    minimumReportInterval: 0,
                    maximumReportInterval: constants.repInterval.HOUR,
                    reportableChange: 1,
                }], manufacturerOptions);
            // report boost as it's disabled by thermostat after 5 minutes
            await endpoint.configureReporting('hvacThermostat', [{
                    attribute: { ID: 0x4043, type: zigbee_herdsman_1.Zcl.DataType.enum8 },
                    minimumReportInterval: 0,
                    maximumReportInterval: constants.repInterval.HOUR,
                    reportableChange: 1,
                }], manufacturerOptions);
            await endpoint.read('hvacThermostat', ['localTemperatureCalibration']);
            await endpoint.read('hvacThermostat', [0x4007, 0x4042, 0x4043], manufacturerOptions);
            await endpoint.read('hvacUserInterfaceCfg', ['keypadLockout']);
            await endpoint.read('hvacUserInterfaceCfg', [0x403a, 0x403b], manufacturerOptions);
        },
    },
    {
        zigbeeModel: ['RBSH-RTH0-ZB-EU'],
        model: 'BTH-RM230Z',
        vendor: 'Bosch',
        description: 'Room thermostat II 230V',
        fromZigbee: [fromZigbee_1.default.humidity, fromZigbee_1.default.thermostat, fzLocal.bosch_thermostat, fzLocal.bosch_userInterface],
        toZigbee: [toZigbee_1.default.thermostat_occupied_heating_setpoint, toZigbee_1.default.thermostat_local_temperature_calibration,
            toZigbee_1.default.thermostat_local_temperature, toZigbee_1.default.thermostat_keypad_lockout, toZigbee_1.default.thermostat_running_state,
            tzLocal.bosch_thermostat, tzLocal.bosch_userInterface],
        exposes: [
            e.climate()
                .withLocalTemperature()
                .withSetpoint('occupied_heating_setpoint', 5, 30, 0.5)
                .withLocalTemperatureCalibration(-12, 12, 0.5)
                .withSystemMode(['off', 'heat', 'auto'])
                .withRunningState(['idle', 'heat'], ea.STATE_GET),
            e.humidity(),
            e.binary('boost', ea.ALL, 'ON', 'OFF').withDescription('Activate Boost heating'),
            e.binary('window_open', ea.ALL, 'ON', 'OFF').withDescription('Window open'),
            e.child_lock().setAccess('state', ea.ALL),
            e.numeric('display_ontime', ea.ALL).withValueMin(5).withValueMax(30).withDescription('Specifies the display On-time'),
            e.numeric('display_brightness', ea.ALL).withValueMin(0).withValueMax(10).withDescription('Specifies the brightness value of the display'),
        ],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg', 'hvacThermostat', 'hvacUserInterfaceCfg', 'msRelativeHumidity']);
            await reporting.thermostatOccupiedHeatingSetpoint(endpoint);
            await reporting.thermostatTemperature(endpoint);
            await reporting.thermostatKeypadLockMode(endpoint);
            await reporting.humidity(endpoint);
            // report operating_mode (system_mode)
            await endpoint.configureReporting('hvacThermostat', [{
                    attribute: { ID: 0x4007, type: zigbee_herdsman_1.Zcl.DataType.enum8 },
                    minimumReportInterval: 0,
                    maximumReportInterval: constants.repInterval.HOUR,
                    reportableChange: 1,
                }], manufacturerOptions);
            // report pi_heating_demand (valve opening)
            await endpoint.configureReporting('hvacThermostat', [{
                    attribute: { ID: 0x4020, type: zigbee_herdsman_1.Zcl.DataType.enum8 },
                    minimumReportInterval: 0,
                    maximumReportInterval: constants.repInterval.HOUR,
                    reportableChange: 1,
                }], manufacturerOptions);
            // report window_open
            await endpoint.configureReporting('hvacThermostat', [{
                    attribute: { ID: 0x4042, type: zigbee_herdsman_1.Zcl.DataType.enum8 },
                    minimumReportInterval: 0,
                    maximumReportInterval: constants.repInterval.HOUR,
                    reportableChange: 1,
                }], manufacturerOptions);
            // report boost as it's disabled by thermostat after 5 minutes
            await endpoint.configureReporting('hvacThermostat', [{
                    attribute: { ID: 0x4043, type: zigbee_herdsman_1.Zcl.DataType.enum8 },
                    minimumReportInterval: 0,
                    maximumReportInterval: constants.repInterval.HOUR,
                    reportableChange: 1,
                }], manufacturerOptions);
            await endpoint.read('hvacThermostat', ['localTemperatureCalibration']);
            await endpoint.read('hvacThermostat', [0x4007, 0x4020, 0x4042, 0x4043], manufacturerOptions);
            await endpoint.read('hvacUserInterfaceCfg', ['keypadLockout']);
            await endpoint.read('hvacUserInterfaceCfg', [0x403a, 0x403b], manufacturerOptions);
        },
    },
    {
        zigbeeModel: ['Champion'],
        model: '8750001213',
        vendor: 'Bosch',
        description: 'Twinguard',
        fromZigbee: [fzLocal.bosch_twinguard_measurements, fzLocal.bosch_twinguard_sensitivity,
            fzLocal.bosch_twinguard_pre_alarm, fzLocal.bosch_twinguard_alarm_state, fzLocal.bosch_twinguard_smoke_alarm_state,
            fzLocal.bosch_twinguard_heartbeat],
        toZigbee: [tzLocal.bosch_twinguard],
        configure: async (device, coordinatorEndpoint, logger) => {
            const coordinatorEndpointB = coordinatorEndpoint.getDevice().getEndpoint(1);
            await reporting.bind(device.getEndpoint(1), coordinatorEndpointB, [0x0009]);
            await reporting.bind(device.getEndpoint(7), coordinatorEndpointB, [0x0019]);
            await reporting.bind(device.getEndpoint(7), coordinatorEndpointB, [0x0020]);
            await reporting.bind(device.getEndpoint(1), coordinatorEndpointB, [0xe000]);
            await reporting.bind(device.getEndpoint(3), coordinatorEndpointB, [0xe002]);
            await reporting.bind(device.getEndpoint(1), coordinatorEndpointB, [0xe004]);
            await reporting.bind(device.getEndpoint(12), coordinatorEndpointB, [0xe006]);
            await reporting.bind(device.getEndpoint(12), coordinatorEndpointB, [0xe007]);
            await device.getEndpoint(1).read('manuSpecificBosch5', ['unknown_attribute'], manufacturerOptions); // Needed for pairing
            await device.getEndpoint(12).command('manuSpecificBosch7', 'pairingCompleted', manufacturerOptions); // Needed for pairing
            await device.getEndpoint(1).write('manuSpecificBosch', { 0x4003: { value: 0x0002, type: 0x21 } }, manufacturerOptions); // Setting defaults
            await device.getEndpoint(1).write('manuSpecificBosch5', { 0x4001: { value: 0x01, type: 0x18 } }, manufacturerOptions); // Setting defaults
            await device.getEndpoint(12).write('manuSpecificBosch7', { 0x5005: { value: 0x01, type: 0x18 } }, manufacturerOptions); // Setting defaults
            await device.getEndpoint(1).read('manuSpecificBosch', ['sensitivity'], manufacturerOptions);
            await device.getEndpoint(1).read('manuSpecificBosch5', ['pre_alarm'], manufacturerOptions);
            await device.getEndpoint(12).read('manuSpecificBosch7', ['heartbeat'], manufacturerOptions);
        },
        exposes: [
            e.smoke(), e.temperature(), e.humidity(), e.co2(), e.illuminance_lux(), e.battery(),
            e.enum('alarm', ea.ALL, Object.keys(sirenState)).withDescription('Mode of the alarm (sound effect)'),
            e.text('siren_state', ea.STATE).withDescription('Siren state'),
            e.binary('self_test', ea.ALL, true, false).withDescription('Initiate self-test'),
            e.enum('sensitivity', ea.ALL, Object.keys(smokeSensitivity)).withDescription('Sensitivity of the smoke alarm'),
            e.enum('pre_alarm', ea.ALL, Object.keys(stateOffOn)).withDescription('Enable/disable pre-alarm'),
            e.enum('heartbeat', ea.ALL, Object.keys(stateOffOn)).withDescription('Enable/disable heartbeat'),
        ],
    },
    {
        zigbeeModel: ['RFPR-ZB-SH-EU'],
        model: 'RFPR-ZB-SH-EU',
        vendor: 'Bosch',
        description: 'Wireless motion detector',
        fromZigbee: [fromZigbee_1.default.temperature, fromZigbee_1.default.battery, fromZigbee_1.default.ias_occupancy_alarm_1],
        toZigbee: [],
        meta: { battery: { voltageToPercentage: '3V_2500' } },
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['msTemperatureMeasurement', 'genPowerCfg']);
            await reporting.temperature(endpoint);
            await reporting.batteryVoltage(endpoint);
        },
        exposes: [e.temperature(), e.battery(), e.occupancy(), e.battery_low(), e.tamper()],
    },
    {
        zigbeeModel: ['RBSH-SP-ZB-EU', 'RBSH-SP-ZB-FR', 'RBSH-SP-ZB-GB'],
        model: 'BSP-FZ2',
        vendor: 'Bosch',
        description: 'Plug compact EU',
        ota: ota.zigbeeOTA,
        fromZigbee: [fromZigbee_1.default.on_off, fromZigbee_1.default.power_on_behavior, fromZigbee_1.default.electrical_measurement, fromZigbee_1.default.metering],
        toZigbee: [toZigbee_1.default.on_off, toZigbee_1.default.power_on_behavior],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await endpoint.read('genOnOff', ['onOff', 'startUpOnOff']);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff']);
            await reporting.bind(endpoint, coordinatorEndpoint, ['seMetering']);
            await reporting.readMeteringMultiplierDivisor(endpoint);
            await reporting.currentSummDelivered(endpoint, { change: [0, 1] });
            await reporting.bind(endpoint, coordinatorEndpoint, ['haElectricalMeasurement']);
            await endpoint.read('haElectricalMeasurement', ['acPowerMultiplier', 'acPowerDivisor']);
            await reporting.activePower(endpoint);
        },
        exposes: [e.switch(), e.power_on_behavior(), e.power(), e.energy()],
        whiteLabel: [
            { vendor: 'Bosch', model: 'BSP-EZ2', description: 'Plug compact FR', fingerprint: [{ modelID: 'RBSH-SP-ZB-FR' }] },
            { vendor: 'Bosch', model: 'BSP-GZ2', description: 'Plug compact UK', fingerprint: [{ modelID: 'RBSH-SP-ZB-GB' }] },
        ],
    },
    {
        zigbeeModel: ['RBSH-SWD-ZB'],
        model: 'BSEN-C2',
        vendor: 'Bosch',
        description: 'Door/window contact II',
        fromZigbee: [fzLocal.bosch_contact],
        toZigbee: [],
        exposes: [e.battery_low(), e.contact(), e.action(['single', 'long'])],
    },
    {
        zigbeeModel: ['RBSH-SWDV-ZB'],
        model: 'BSEN-CV',
        vendor: 'Bosch',
        description: 'Door/window contact II plus',
        fromZigbee: [fzLocal.bosch_contact],
        toZigbee: [],
        exposes: [e.battery_low(), e.contact(), e.vibration(), e.action(['single', 'long'])],
    },
    {
        zigbeeModel: ['RBSH-MMR-ZB-EU'],
        model: 'BMCT-RZ',
        vendor: 'Bosch',
        description: 'Relay, potential free',
        extend: [(0, modernExtend_1.onOff)({ powerOnBehavior: false })],
    },
    {
        zigbeeModel: ['RBSH-MMS-ZB-EU'],
        model: 'BMCT-SLZ',
        vendor: 'Bosch',
        description: 'Light/shutter control unit II',
        fromZigbee: [fzLocal.bmct, fromZigbee_1.default.cover_position_tilt, fromZigbee_1.default.on_off, fromZigbee_1.default.power_on_behavior],
        toZigbee: [tzLocal.bmct, toZigbee_1.default.cover_position_tilt, toZigbee_1.default.on_off, toZigbee_1.default.power_on_behavior],
        meta: { multiEndpoint: true },
        endpoint: (device) => {
            return { 'left': 2, 'right': 3 };
        },
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint1 = device.getEndpoint(1);
            await reporting.bind(endpoint1, coordinatorEndpoint, ['genIdentify', 'closuresWindowCovering', 'manuSpecificBosch10']);
            await reporting.currentPositionLiftPercentage(endpoint1);
            await endpoint1.read('manuSpecificBosch10', ['deviceMode', 'switchType',
                'calibrationOpeningTime', 'calibrationClosingTime', 'childLock', 'motorState']).catch((e) => { });
            const endpoint2 = device.getEndpoint(2);
            await endpoint2.read('manuSpecificBosch10', ['childLock']);
            await reporting.bind(endpoint2, coordinatorEndpoint, ['genIdentify', 'genOnOff']).catch((e) => { });
            await reporting.onOff(endpoint2);
            const endpoint3 = device.getEndpoint(3);
            await endpoint3.read('manuSpecificBosch10', ['childLock']).catch((e) => { });
            await reporting.bind(endpoint3, coordinatorEndpoint, ['genIdentify', 'genOnOff']);
            await reporting.onOff(endpoint3);
        },
        exposes: (device, options) => {
            const lightExposes = [
                e.enum('switch_type', ea.ALL, Object.keys(stateSwitchType))
                    .withDescription('Module controlled by a rocker switch or a button'),
                e.switch().withEndpoint('left'),
                e.switch().withEndpoint('right'),
                e.power_on_behavior().withEndpoint('right'),
                e.power_on_behavior().withEndpoint('left'),
                e.binary('child_lock', ea.ALL, 'ON', 'OFF').withEndpoint('left')
                    .withDescription('Enable/Disable child lock'),
                e.binary('child_lock', ea.ALL, 'ON', 'OFF').withEndpoint('right')
                    .withDescription('Enable/Disable child lock'),
            ];
            const coverExposes = [
                e.cover_position(),
                e.enum('motor_state', ea.STATE, Object.keys(stateMotor))
                    .withDescription('Shutter motor actual state '),
                e.binary('child_lock', ea.ALL, 'ON', 'OFF').withDescription('Enable/Disable child lock'),
                e.numeric('calibration', ea.ALL).withUnit('s').withEndpoint('closing_time')
                    .withDescription('Calibration closing time').withValueMin(1).withValueMax(90),
                e.numeric('calibration', ea.ALL).withUnit('s').withEndpoint('opening_time')
                    .withDescription('Calibration opening time').withValueMin(1).withValueMax(90),
            ];
            if (device) {
                const deviceModeKey = device.getEndpoint(1).getClusterAttributeValue('manuSpecificBosch10', 'deviceMode');
                const deviceMode = Object.keys(stateDeviceMode).find((key) => stateDeviceMode[key] === deviceModeKey);
                if (deviceMode === 'light') {
                    return [...lightExposes, e.linkquality()];
                }
                else if (deviceMode === 'shutter') {
                    return [...coverExposes, e.linkquality()];
                }
            }
            return [e.enum('device_mode', ea.ALL, Object.keys(stateDeviceMode)).withDescription('Device mode'),
                e.linkquality()];
        },
    },
    {
        zigbeeModel: ['RBSH-US4BTN-ZB-EU'],
        model: 'BHI-US',
        vendor: 'Bosch',
        description: 'Universal Switch II',
        ota: ota.zigbeeOTA,
        fromZigbee: [fzLocal.bhius_button_press, fzLocal.bhius_config, fromZigbee_1.default.battery],
        toZigbee: [tzLocal.bhius_config],
        exposes: [
            e.battery_low(),
            e.battery_voltage(),
            e.text('config_led_top_left_press', ea.ALL).withLabel('LED config (top left short press)')
                .withDescription(labelShortPress)
                .withCategory('config'),
            e.text('config_led_top_right_press', ea.ALL).withLabel('LED config (top right short press)')
                .withDescription(labelShortPress)
                .withCategory('config'),
            e.text('config_led_bottom_left_press', ea.ALL).withLabel('LED config (bottom left short press)')
                .withDescription(labelShortPress)
                .withCategory('config'),
            e.text('config_led_bottom_right_press', ea.ALL).withLabel('LED config (bottom right short press)')
                .withDescription(labelShortPress)
                .withCategory('config'),
            e.text('config_led_top_left_longpress', ea.ALL).withLabel('LED config (top left long press)')
                .withDescription(labelLongPress)
                .withCategory('config'),
            e.text('config_led_top_right_longpress', ea.ALL).withLabel('LED config (top right long press)')
                .withDescription(labelLongPress)
                .withCategory('config'),
            e.text('config_led_bottom_left_longpress', ea.ALL).withLabel('LED config (bottom left long press)')
                .withDescription(labelLongPress)
                .withCategory('config'),
            e.text('config_led_bottom_right_longpress', ea.ALL).withLabel('LED config (bottom right long press)')
                .withDescription(labelLongPress)
                .withCategory('config'),
        ],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            // Read default LED configuration
            await endpoint.read('manuSpecificBosch9', [0x0010, 0x0011, 0x0012, 0x0013], { ...manufacturerOptions, sendPolicy: 'immediate' })
                .catch((error) => { });
            await endpoint.read('manuSpecificBosch9', [0x0020, 0x0021, 0x0022, 0x0023], { ...manufacturerOptions, sendPolicy: 'immediate' })
                .catch((error) => { });
            // We also have to read this one. Value reads 0x0f, looks like a bitmap
            await endpoint.read('manuSpecificBosch9', [0x0024], { ...manufacturerOptions, sendPolicy: 'immediate' });
            await endpoint.command('manuSpecificBosch9', 'pairingCompleted', { data: Buffer.from([0x00]) }, { sendPolicy: 'immediate' });
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg', 'genBasic', 'manuSpecificBosch9']);
            await reporting.batteryPercentageRemaining(endpoint);
            await reporting.batteryVoltage(endpoint);
        },
    },
];
exports.default = definitions;
module.exports = definitions;
//# sourceMappingURL=bosch.js.map