/// <reference types="node" />
import { Fz, Definition, KeyValue, KeyValueAny, Tz, ModernExtend } from './types';
import * as modernExtend from './modernExtend';
declare type Day = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
export interface TrvScheduleConfigEvent {
    time: number;
    temperature: number;
}
export interface TrvScheduleConfig {
    days: Day[];
    events: TrvScheduleConfigEvent[];
}
export declare const buffer2DataObject: (meta: Fz.Meta, model: Definition, buffer: Buffer) => KeyValue;
export declare const numericAttributes2Payload: (msg: Fz.Message, meta: Fz.Meta, model: Definition, options: KeyValue, dataObject: KeyValue) => Promise<KeyValue>;
type LumiPresenceRegionZone = {
    x: number;
    y: number;
};
export declare const presence: {
    constants: {
        region_event_key: number;
        region_event_types: {
            Enter: number;
            Leave: number;
            Occupied: number;
            Unoccupied: number;
        };
        region_config_write_attribute: number;
        region_config_write_attribute_type: number;
        region_config_cmds: {
            /**
             * Creates new region (or force replaces existing one)
             * with new zones definition.
             */
            create: number;
            /**
             * Modifies existing region.
             * Note: unused, as it seems to break existing regions
             * (region stops reporting new detection events).
             * Use "create" instead, as it replaces existing region with new one.
             */
            modify: number;
            /**
             * Deletes existing region.
             */
            delete: number;
        };
        region_config_regionId_min: number;
        region_config_regionId_max: number;
        region_config_zoneY_min: number;
        region_config_zoneY_max: number;
        region_config_zoneX_min: number;
        region_config_zoneX_max: number;
        region_config_cmd_suffix_upsert: number;
        region_config_cmd_suffix_delete: number;
    };
    mappers: {
        lumi_presence: {
            region_event_type_names: {
                [x: number]: string;
            };
        };
    };
    encodeXCellsDefinition: (xCells?: number[]) => number;
    encodeXCellIdx: (cellXIdx: number) => number;
    parseAqaraFp1RegionDeleteInput: (input: KeyValueAny) => {
        isSuccess: false;
        error: {
            reason: string;
        };
    } | {
        isSuccess: boolean;
        payload: {
            command: {
                region_id: number;
            };
        };
    };
    parseAqaraFp1RegionUpsertInput: (input: KeyValueAny) => {
        isSuccess: false;
        error: {
            reason: string;
        };
    } | {
        isSuccess: boolean;
        payload: {
            command: {
                region_id: number;
                zones: LumiPresenceRegionZone[];
            };
        };
    };
    isAqaraFp1RegionId: (value: any) => value is number;
    isAqaraFp1RegionZoneDefinition: (value: any) => value is LumiPresenceRegionZone;
    failure: (error: {
        reason: string;
    }) => {
        isSuccess: false;
        error: {
            reason: string;
        };
    };
};
export declare const trv: {
    decodeFirmwareVersionString(value: number): string;
    decodePreset(value: number): {
        setup: boolean;
        preset: string;
    };
    decodeHeartbeat(meta: Fz.Meta, model: Definition, messageBuffer: Buffer): KeyValue;
    /**
     * Decode a Zigbee schedule configuration message into a schedule configuration object.
     */
    decodeSchedule(buffer: Buffer): TrvScheduleConfig;
    validateSchedule(schedule: TrvScheduleConfig): void;
    /**
     * Encodes a schedule object into Zigbee message format.
     */
    encodeSchedule(schedule: TrvScheduleConfig): Buffer;
    stringifySchedule(schedule: TrvScheduleConfig): string;
    parseSchedule(stringifiedSchedule: string): TrvScheduleConfig;
};
export declare const manufacturerCode = 4447;
export declare const lumiModernExtend: {
    lumiLight: (args?: Omit<modernExtend.LightArgs, 'colorTemp'> & {
        colorTemp?: true;
        powerOutageMemory?: 'switch' | 'light';
    }) => ModernExtend;
    lumiSwitchType: (args?: Partial<modernExtend.EnumLookupArgs>) => ModernExtend;
    lumiPowerOnBehavior: (args?: Partial<modernExtend.EnumLookupArgs>) => ModernExtend;
    lumiOperationMode: (args?: Partial<modernExtend.EnumLookupArgs>) => ModernExtend;
    lumiAction: (args?: Partial<modernExtend.ActionEnumLookupArgs>) => ModernExtend;
    lumiVoc: (args?: Partial<modernExtend.NumericArgs>) => ModernExtend;
    lumiAirQuality: (args?: Partial<modernExtend.EnumLookupArgs>) => ModernExtend;
    lumiDisplayUnit: (args?: Partial<modernExtend.EnumLookupArgs>) => ModernExtend;
    lumiOutageCountRestoreBindReporting: () => ModernExtend;
    lumiZigbeeOTA: () => ModernExtend;
    lumiPower: (args?: Partial<modernExtend.NumericArgs>) => ModernExtend;
    lumiElectricityMeter: () => ModernExtend;
    lumiOverloadProtection: (args?: Partial<modernExtend.NumericArgs>) => ModernExtend;
    lumiLedIndicator: (args?: Partial<modernExtend.BinaryArgs>) => ModernExtend;
    lumiButtonLock: (args?: Partial<modernExtend.BinaryArgs>) => ModernExtend;
};
export { lumiModernExtend as modernExtend };
export declare const fromZigbee: {
    aqara_feeder: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: import("./types").Publish, options: KeyValue, meta: Fz.Meta) => KeyValue;
    };
    lumi_basic: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: import("./types").Publish, options: KeyValue, meta: Fz.Meta) => Promise<KeyValue>;
    };
    lumi_basic_raw: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: import("./types").Publish, options: KeyValue, meta: Fz.Meta) => Promise<{}>;
    };
    lumi_specific: {
        cluster: string;
        type: string[];
        convert: (model: Definition, msg: Fz.Message, publish: import("./types").Publish, options: KeyValue, meta: Fz.Meta) => Promise<KeyValue>;
    };
};
export declare const toZigbee: {
    aqara_feeder: {
        key: string[];
        convertSet: (entity: import("zigbee-herdsman/dist/controller/model/group").default | import("zigbee-herdsman/dist/controller/model/endpoint").default, key: string, value: unknown, meta: Tz.Meta) => Promise<{
            state: {
                [x: string]: unknown;
            };
        }>;
    };
};
//# sourceMappingURL=lumi.d.ts.map