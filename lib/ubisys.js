"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ubisysModernExtend = void 0;
const exposes_1 = require("./exposes");
const modernExtend_1 = require("./modernExtend");
const zigbee_herdsman_1 = require("zigbee-herdsman");
exports.ubisysModernExtend = {
    localTemperatureOffset: (args) => (0, modernExtend_1.numeric)({
        name: 'local_temperature_offset',
        cluster: 'hvacThermostat',
        attribute: 'ubisysTemperatureOffset',
        description: 'Specifies the temperature offset for the locally measured temperature value.',
        valueMin: -10,
        valueMax: 10,
        unit: 'ºC',
        ...args,
    }),
    occupiedHeatingSetpointDefault: (args) => (0, modernExtend_1.numeric)({
        name: 'occupied_heating_default_setpoint',
        cluster: 'hvacThermostat',
        attribute: 'ubisysDefaultOccupiedHeatingSetpoint',
        description: 'Specifies the default heating setpoint during occupancy, ' +
            'representing the targeted temperature when a recurring weekly schedule ends without a follow-up schedule.',
        scale: 100,
        valueStep: 0.5, // H1 interface uses 0.5 step
        valueMin: 7,
        valueMax: 30,
        unit: 'ºC',
        ...args,
    }),
    remoteTemperatureDuration: (args) => (0, modernExtend_1.numeric)({
        name: 'remote_temperature_duration',
        cluster: 'hvacThermostat',
        attribute: 'ubisysRemoteTemperatureValidDuration',
        description: 'Specifies the duration period in seconds, during which a remotely measured temperature value ' +
            'remains valid since its reception as attribute report.',
        valueMin: 0,
        valueMax: 86400,
        unit: 's',
        ...args,
    }),
    vacationMode: () => {
        const clusterName = 'hvacThermostat';
        const writeableAttributeName = 'ubisysVacationMode';
        const readableAttributeName = 'occupancy';
        const propertyName = 'vacation_mode';
        const access = exposes_1.access.ALL;
        const expose = exposes_1.presets.binary(propertyName, access, true, false)
            .withDescription('When Vacation Mode is active the schedule is disabled and unoccupied_heating_setpoint is used.');
        const fromZigbee = [{
                cluster: clusterName,
                type: ['attributeReport', 'readResponse'],
                convert: (model, msg, publish, options, meta) => {
                    if (msg.data.hasOwnProperty(readableAttributeName)) {
                        return { [propertyName]: (msg.data.occupancy === 0) };
                    }
                },
            }];
        const toZigbee = [{
                key: [propertyName],
                convertSet: async (entity, key, value, meta) => {
                    if (typeof value === 'boolean') {
                        // NOTE: DataType is boolean in zcl definition as per the device technical reference
                        //       passing a boolean type 'value' throws INVALID_DATA_TYPE, we need to pass 1 (true) or 0 (false)
                        //       ZCL DataType used does still need to be 0x0010 (Boolean)
                        await entity.write(clusterName, { [writeableAttributeName]: value ? 1 : 0 }, { manufacturerCode: zigbee_herdsman_1.Zcl.ManufacturerCode.UBISYS });
                    }
                    else {
                        meta.logger.error(`${propertyName} must be a boolean!`);
                    }
                },
                convertGet: async (entity, key, meta) => {
                    await entity.read(clusterName, [readableAttributeName]);
                },
            }];
        const configure = (0, modernExtend_1.setupConfigureForReporting)(clusterName, readableAttributeName, { min: 0, max: '1_HOUR', change: 0 }, access);
        return { exposes: [expose], fromZigbee, toZigbee, configure, isModernExtend: true };
    },
};
//# sourceMappingURL=ubisys.js.map