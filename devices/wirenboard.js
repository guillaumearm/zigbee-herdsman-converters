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
const ota = __importStar(require("../lib/ota"));
const constants = __importStar(require("../lib/constants"));
const e = exposes.presets;
const ea = exposes.access;
const utils_1 = require("../lib/utils");
const sprutCode = 0x6666;
const manufacturerOptions = { manufacturerCode: sprutCode };
const switchActionValues = ['OFF', 'ON'];
const co2Lookup = {
    co2_autocalibration: 'sprutCO2AutoCalibration',
    co2_manual_calibration: 'sprutCO2Calibration',
};
const fzLocal = {
    temperature: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const temperature = parseFloat(msg.data['measuredValue']) / 100.0;
            return { temperature };
        },
    },
    occupancy_level: {
        cluster: 'msOccupancySensing',
        type: ['readResponse', 'attributeReport'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('sprutOccupancyLevel')) {
                return { occupancy_level: msg.data['sprutOccupancyLevel'] };
            }
        },
    },
    voc: {
        cluster: 'sprutVoc',
        type: ['readResponse', 'attributeReport'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('voc')) {
                return { voc: msg.data['voc'] };
            }
        },
    },
    noise: {
        cluster: 'sprutNoise',
        type: ['readResponse', 'attributeReport'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('noise')) {
                return { noise: msg.data['noise'].toFixed(2) };
            }
        },
    },
    noise_detected: {
        cluster: 'sprutNoise',
        type: ['readResponse', 'attributeReport'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('noiseDetected')) {
                return { noise_detected: msg.data['noiseDetected'] === 1 };
            }
        },
    },
    occupancy_timeout: {
        cluster: 'msOccupancySensing',
        type: ['readResponse', 'attributeReport'],
        convert: (model, msg, publish, options, meta) => {
            return { occupancy_timeout: msg.data['pirOToUDelay'] };
        },
    },
    noise_timeout: {
        cluster: 'sprutNoise',
        type: ['readResponse', 'attributeReport'],
        convert: (model, msg, publish, options, meta) => {
            return { noise_timeout: msg.data['noiseAfterDetectDelay'] };
        },
    },
    occupancy_sensitivity: {
        cluster: 'msOccupancySensing',
        type: ['readResponse', 'attributeReport'],
        convert: (model, msg, publish, options, meta) => {
            return { occupancy_sensitivity: msg.data['sprutOccupancySensitivity'] };
        },
    },
    noise_detect_level: {
        cluster: 'sprutNoise',
        type: ['readResponse', 'attributeReport'],
        convert: (model, msg, publish, options, meta) => {
            return { noise_detect_level: msg.data['noiseDetectLevel'] };
        },
    },
    co2_mh_z19b_config: {
        cluster: 'msCO2',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('sprutCO2AutoCalibration')) {
                return { co2_autocalibration: switchActionValues[msg.data['sprutCO2AutoCalibration']] };
            }
            if (msg.data.hasOwnProperty('sprutCO2Calibration')) {
                return { co2_manual_calibration: switchActionValues[msg.data['sprutCO2Calibration']] };
            }
        },
    },
    th_heater: {
        cluster: 'msRelativeHumidity',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('sprutHeater')) {
                return { th_heater: switchActionValues[msg.data['sprutHeater']] };
            }
        },
    },
};
const tzLocal = {
    sprut_ir_remote: {
        key: ['play_store', 'learn_start', 'learn_stop', 'clear_store', 'play_ram', 'learn_ram_start', 'learn_ram_stop'],
        convertSet: async (entity, key, value, meta) => {
            const options = {
                frameType: 0, manufacturerCode: sprutCode, disableDefaultResponse: true,
                disableResponse: true, reservedBits: 0, direction: 0, writeUndiv: false,
                // @ts-expect-error
                transactionSequenceNumber: null,
            };
            switch (key) {
                case 'play_store':
                    await entity.command('sprutIrBlaster', 'playStore', { param: value['rom'] }, options);
                    break;
                case 'learn_start':
                    await entity.command('sprutIrBlaster', 'learnStart', { value: value['rom'] }, options);
                    break;
                case 'learn_stop':
                    await entity.command('sprutIrBlaster', 'learnStop', { value: value['rom'] }, options);
                    break;
                case 'clear_store':
                    await entity.command('sprutIrBlaster', 'clearStore', {}, options);
                    break;
                case 'play_ram':
                    await entity.command('sprutIrBlaster', 'playRam', {}, options);
                    break;
                case 'learn_ram_start':
                    await entity.command('sprutIrBlaster', 'learnRamStart', {}, options);
                    break;
                case 'learn_ram_stop':
                    await entity.command('sprutIrBlaster', 'learnRamStop', {}, options);
                    break;
            }
        },
    },
    occupancy_timeout: {
        key: ['occupancy_timeout'],
        convertSet: async (entity, key, value, meta) => {
            const number = (0, utils_1.toNumber)(value, 'occupancy_timeout');
            await entity.write('msOccupancySensing', { pirOToUDelay: number }, (0, utils_1.getOptions)(meta.mapped, entity));
            return { state: { [key]: number } };
        },
        convertGet: async (entity, key, meta) => {
            await entity.read('msOccupancySensing', ['pirOToUDelay']);
        },
    },
    noise_timeout: {
        key: ['noise_timeout'],
        convertSet: async (entity, key, value, meta) => {
            let number = (0, utils_1.toNumber)(value, 'noise_timeout');
            number *= 1;
            await entity.write('sprutNoise', { noiseAfterDetectDelay: number }, (0, utils_1.getOptions)(meta.mapped, entity));
            return { state: { [key]: number } };
        },
        convertGet: async (entity, key, meta) => {
            await entity.read('sprutNoise', ['noiseAfterDetectDelay']);
        },
    },
    occupancy_sensitivity: {
        key: ['occupancy_sensitivity'],
        convertSet: async (entity, key, value, meta) => {
            let number = (0, utils_1.toNumber)(value, 'occupancy_sensitivity');
            number *= 1;
            const options = (0, utils_1.getOptions)(meta.mapped, entity, manufacturerOptions);
            await entity.write('msOccupancySensing', { 'sprutOccupancySensitivity': number }, options);
            return { state: { [key]: number } };
        },
        convertGet: async (entity, key, meta) => {
            await entity.read('msOccupancySensing', ['sprutOccupancySensitivity'], manufacturerOptions);
        },
    },
    noise_detect_level: {
        key: ['noise_detect_level'],
        convertSet: async (entity, key, value, meta) => {
            let number = (0, utils_1.toNumber)(value, 'noise_detect_level');
            number *= 1;
            const options = (0, utils_1.getOptions)(meta.mapped, entity, manufacturerOptions);
            await entity.write('sprutNoise', { 'noiseDetectLevel': number }, options);
            return { state: { [key]: number } };
        },
        convertGet: async (entity, key, meta) => {
            await entity.read('sprutNoise', ['noiseDetectLevel'], manufacturerOptions);
        },
    },
    temperature_offset: {
        key: ['temperature_offset'],
        convertSet: async (entity, key, value, meta) => {
            let number = (0, utils_1.toNumber)(value, 'temperature_offset');
            number *= 1;
            const newValue = number * 100.0;
            const options = (0, utils_1.getOptions)(meta.mapped, entity, manufacturerOptions);
            await entity.write('msTemperatureMeasurement', { 'sprutTemperatureOffset': newValue }, options);
            return { state: { [key]: number } };
        },
    },
    co2_mh_z19b_config: {
        key: ['co2_autocalibration', 'co2_manual_calibration'],
        convertSet: async (entity, key, value, meta) => {
            let newValue = value;
            (0, utils_1.assertString)(value, 'co2_autocalibration/co2_manual_calibration');
            newValue = switchActionValues.indexOf(value);
            const options = (0, utils_1.getOptions)(meta.mapped, entity, manufacturerOptions);
            await entity.write('msCO2', { [(0, utils_1.getFromLookup)(key, co2Lookup)]: newValue }, options);
            return { state: { [key]: value } };
        },
        convertGet: async (entity, key, meta) => {
            await entity.read('msCO2', [(0, utils_1.getFromLookup)(key, co2Lookup)], manufacturerOptions);
        },
    },
    th_heater: {
        key: ['th_heater'],
        convertSet: async (entity, key, value, meta) => {
            let newValue = value;
            (0, utils_1.assertString)(value, 'th_heater');
            newValue = switchActionValues.indexOf(value);
            const options = (0, utils_1.getOptions)(meta.mapped, entity, manufacturerOptions);
            await entity.write('msRelativeHumidity', { 'sprutHeater': newValue }, options);
            return { state: { [key]: value } };
        },
        convertGet: async (entity, key, meta) => {
            await entity.read('msRelativeHumidity', ['sprutHeater'], manufacturerOptions);
        },
    },
};
const definitions = [
    {
        zigbeeModel: ['WBMSW3'],
        model: 'WB-MSW-ZIGBEE v.3',
        vendor: 'Wirenboard',
        description: 'Wall-mounted Zigbee sensor',
        fromZigbee: [fzLocal.temperature, fromZigbee_1.default.illuminance, fromZigbee_1.default.humidity, fromZigbee_1.default.occupancy, fzLocal.occupancy_level, fromZigbee_1.default.co2, fzLocal.voc,
            fzLocal.noise, fzLocal.noise_detected, fromZigbee_1.default.on_off, fzLocal.occupancy_timeout, fzLocal.noise_timeout, fzLocal.co2_mh_z19b_config,
            fzLocal.th_heater, fzLocal.occupancy_sensitivity, fzLocal.noise_detect_level],
        toZigbee: [toZigbee_1.default.on_off, tzLocal.sprut_ir_remote, tzLocal.occupancy_timeout, tzLocal.noise_timeout, tzLocal.co2_mh_z19b_config,
            tzLocal.th_heater, tzLocal.temperature_offset, tzLocal.occupancy_sensitivity, tzLocal.noise_detect_level],
        exposes: [e.temperature(), e.illuminance(), e.illuminance_lux(), e.humidity(), e.occupancy(), e.occupancy_level(), e.co2(),
            e.voc(), e.noise(), e.noise_detected(), e.switch().withEndpoint('l1'), e.switch().withEndpoint('l2'),
            e.switch().withEndpoint('l3'),
            e.numeric('noise_timeout', ea.ALL).withValueMin(0).withValueMax(2000).withUnit('s').withCategory('config')
                .withDescription('Time in seconds after which noise is cleared after detecting it (default: 60)'),
            e.numeric('occupancy_timeout', ea.ALL).withValueMin(0).withValueMax(2000).withUnit('s').withCategory('config')
                .withDescription('Time in seconds after which occupancy is cleared after detecting it (default: 60)'),
            e.numeric('temperature_offset', ea.SET).withValueMin(-10).withValueMax(10).withUnit('°C').withCategory('config')
                .withDescription('Self-heating compensation. The compensation value is subtracted from the measured temperature'),
            e.numeric('occupancy_sensitivity', ea.ALL).withValueMin(0).withValueMax(2000).withCategory('config')
                .withDescription('If the sensor is triggered by the slightest movement, reduce the sensitivity, ' +
                'otherwise increase it (default: 50)'),
            e.numeric('noise_detect_level', ea.ALL).withValueMin(0).withValueMax(150).withUnit('dBA').withCategory('config')
                .withDescription('The minimum noise level at which the detector will work (default: 50)'),
            e.enum('co2_autocalibration', ea.ALL, switchActionValues).withCategory('config')
                .withDescription('Automatic calibration of the CO2 sensor. If ON, the CO2 sensor will automatically calibrate ' +
                'every 7 days. (MH-Z19B sensor)'),
            e.enum('co2_manual_calibration', ea.ALL, switchActionValues).withCategory('config')
                .withDescription('Ventilate the room for 20 minutes, turn on manual calibration, and turn it off after one second. ' +
                'After about 5 minutes the CO2 sensor will show 400ppm. Calibration completed. (MH-Z19B sensor)'),
            e.enum('th_heater', ea.ALL, switchActionValues).withCategory('config')
                .withDescription('Turn on when working in conditions of high humidity (more than 70 %, RH) or condensation, ' +
                'if the sensor shows 0 or 100 %.'),
        ],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint1 = device.getEndpoint(1);
            const binds = ['genBasic', 'msTemperatureMeasurement', 'msIlluminanceMeasurement', 'msRelativeHumidity',
                'msOccupancySensing', 'msCO2', 'sprutVoc', 'sprutNoise', 'sprutIrBlaster', 'genOta'];
            await reporting.bind(endpoint1, coordinatorEndpoint, binds);
            // report configuration
            await reporting.temperature(endpoint1);
            await reporting.illuminance(endpoint1);
            await reporting.humidity(endpoint1);
            await reporting.occupancy(endpoint1);
            let payload = reporting.payload('sprutOccupancyLevel', 10, constants.repInterval.MINUTE, 5);
            await endpoint1.configureReporting('msOccupancySensing', payload, manufacturerOptions);
            payload = reporting.payload('noise', 10, constants.repInterval.MINUTE, 5);
            await endpoint1.configureReporting('sprutNoise', payload);
            // led_red
            await device.getEndpoint(2).read('genOnOff', ['onOff']);
            // led_green
            await device.getEndpoint(3).read('genOnOff', ['onOff']);
            // buzzer
            await device.getEndpoint(4).read('genOnOff', ['onOff']);
        },
        endpoint: (device) => {
            return { 'default': 1, 'l1': 2, 'l2': 3, 'l3': 4 };
        },
        meta: { multiEndpoint: true, multiEndpointSkip: ['humidity'] },
        ota: ota.zigbeeOTA,
    },
    {
        zigbeeModel: ['WBMSW4'],
        model: 'WB-MSW-ZIGBEE v.4',
        vendor: 'Wirenboard',
        description: 'Wall-mounted Zigbee sensor',
        fromZigbee: [fzLocal.temperature, fromZigbee_1.default.illuminance, fromZigbee_1.default.humidity, fromZigbee_1.default.occupancy, fzLocal.occupancy_level, fromZigbee_1.default.co2, fzLocal.voc,
            fzLocal.noise, fzLocal.noise_detected, fromZigbee_1.default.on_off, fzLocal.occupancy_timeout, fzLocal.noise_timeout,
            fzLocal.th_heater, fzLocal.occupancy_sensitivity, fzLocal.noise_detect_level],
        toZigbee: [toZigbee_1.default.on_off, tzLocal.sprut_ir_remote, tzLocal.occupancy_timeout, tzLocal.noise_timeout,
            tzLocal.th_heater, tzLocal.temperature_offset, tzLocal.occupancy_sensitivity, tzLocal.noise_detect_level],
        exposes: [e.temperature(), e.illuminance(), e.illuminance_lux(), e.humidity(), e.occupancy(), e.occupancy_level(), e.co2(),
            e.voc(), e.noise(), e.noise_detected(), e.switch().withEndpoint('l1'), e.switch().withEndpoint('l2'),
            e.switch().withEndpoint('l3'),
            e.numeric('noise_timeout', ea.ALL).withValueMin(0).withValueMax(2000).withUnit('s').withCategory('config')
                .withDescription('Time in seconds after which noise is cleared after detecting it (default: 60)'),
            e.numeric('occupancy_timeout', ea.ALL).withValueMin(0).withValueMax(2000).withUnit('s').withCategory('config')
                .withDescription('Time in seconds after which occupancy is cleared after detecting it (default: 60)'),
            e.numeric('temperature_offset', ea.SET).withValueMin(-10).withValueMax(10).withUnit('°C').withCategory('config')
                .withDescription('Self-heating compensation. The compensation value is subtracted from the measured temperature (default: 0)'),
            e.numeric('occupancy_sensitivity', ea.ALL).withValueMin(0).withValueMax(2000).withCategory('config')
                .withDescription('If the sensor is triggered by the slightest movement, reduce the sensitivity, ' +
                'otherwise increase it (default: 50)'),
            e.numeric('noise_detect_level', ea.ALL).withValueMin(0).withValueMax(150).withUnit('dBA').withCategory('config')
                .withDescription('The minimum noise level at which the detector will work (default: 50)'),
        ],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint1 = device.getEndpoint(1);
            const binds = ['msTemperatureMeasurement', 'msIlluminanceMeasurement', 'msRelativeHumidity',
                'msOccupancySensing', 'msCO2', 'sprutVoc', 'sprutNoise', 'sprutIrBlaster', 'genOta'];
            await reporting.bind(endpoint1, coordinatorEndpoint, binds);
            // report configuration
            await reporting.temperature(endpoint1);
            await reporting.illuminance(endpoint1);
            await reporting.humidity(endpoint1);
            let payload = reporting.payload('occupancy', 10, constants.repInterval.MINUTE, 0);
            await endpoint1.configureReporting('msOccupancySensing', payload);
            payload = reporting.payload('sprutOccupancyLevel', 10, constants.repInterval.MINUTE, 5);
            await endpoint1.configureReporting('msOccupancySensing', payload, manufacturerOptions);
            payload = reporting.payload('noise', 10, constants.repInterval.MINUTE, 5);
            await endpoint1.configureReporting('sprutNoise', payload);
            payload = reporting.payload('measuredValue', 10, constants.repInterval.HOUR, 10);
            await endpoint1.configureReporting('msCO2', payload);
            payload = reporting.payload('voc', 10, constants.repInterval.HOUR, 10);
            await endpoint1.configureReporting('sprutVoc', payload, manufacturerOptions);
            // led_red
            await device.getEndpoint(2).read('genOnOff', ['onOff']);
            // led_green
            await device.getEndpoint(3).read('genOnOff', ['onOff']);
            // buzzer
            await device.getEndpoint(4).read('genOnOff', ['onOff']);
            // disable internal blinking zigbee state green led on start
            await device.getEndpoint(5).write('genBinaryOutput', { 0x0055: { value: 0x00, type: 0x10 } });
            device.powerSource = 'Mains (single phase)';
            device.save();
        },
        endpoint: (device) => {
            return { 'default': 1, 'l1': 2, 'l2': 3, 'l3': 4, 'l4': 5 };
        },
        meta: { multiEndpoint: true, multiEndpointSkip: ['humidity'] },
        ota: ota.zigbeeOTA,
    },
];
exports.default = definitions;
module.exports = definitions;
//# sourceMappingURL=wirenboard.js.map