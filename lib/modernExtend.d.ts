import { ModernExtend, Range, DefinitionOta, Access } from './types';
import { KeyValue, Configure } from './types';
declare const timeLookup: {
    MAX: number;
    '1_HOUR': number;
    '30_MINUTES': number;
    '10_SECONDS': number;
};
type ReportingConfigTime = number | keyof typeof timeLookup;
type ReportingConfigAttribute = string | number | {
    ID: number;
    type: number;
};
type ReportingConfig = {
    min: ReportingConfigTime;
    max: ReportingConfigTime;
    change: number | [number, number];
    attribute: ReportingConfigAttribute;
};
export type ReportingConfigWithoutAttribute = Omit<ReportingConfig, 'attribute'>;
export declare function setupConfigureForReporting(cluster: string | number, attribute: ReportingConfigAttribute, config: ReportingConfigWithoutAttribute, access: Access, endpoints?: string[]): Configure;
export declare function identify(): ModernExtend;
export interface OnOffArgs {
    powerOnBehavior?: boolean;
    ota?: DefinitionOta;
    skipDuplicateTransaction?: boolean;
    endpoints?: {
        [s: string]: number;
    };
    configureReporting?: boolean;
}
export declare function onOff(args?: OnOffArgs): ModernExtend;
type MultiplierDivisor = {
    multiplier?: number;
    divisor?: number;
};
export interface ElectricityMeterArgs {
    cluster?: 'both' | 'metering' | 'electrical';
    current?: false | MultiplierDivisor;
    power?: false | MultiplierDivisor;
    voltage?: false | MultiplierDivisor;
    energy?: false | MultiplierDivisor;
}
export declare function electricityMeter(args?: ElectricityMeterArgs): ModernExtend;
export interface LightArgs {
    effect?: boolean;
    powerOnBehavior?: boolean;
    colorTemp?: {
        startup?: boolean;
        range: Range;
    };
    color?: boolean | {
        modes?: ('xy' | 'hs')[];
        applyRedFix?: boolean;
        enhancedHue?: boolean;
    };
    turnsOffAtBrightness1?: boolean;
    configureReporting?: boolean;
    endpoints?: {
        [s: string]: number;
    };
    ota?: DefinitionOta;
}
export declare function light(args?: LightArgs): ModernExtend;
export interface LockArgs {
    pinCodeCount: number;
}
export declare function lock(args?: LockArgs): ModernExtend;
export interface EnumLookupArgs {
    name: string;
    lookup: KeyValue;
    cluster: string | number;
    attribute: string | {
        ID: number;
        type: number;
    };
    description: string;
    zigbeeCommandOptions?: {
        manufacturerCode?: number;
        disableDefaultResponse?: boolean;
    };
    access?: 'STATE' | 'STATE_GET' | 'ALL';
    endpoint?: string;
    reporting?: ReportingConfigWithoutAttribute;
}
export declare function enumLookup(args: EnumLookupArgs): ModernExtend;
export interface NumericArgs {
    name: string;
    cluster: string | number;
    attribute: string | {
        ID: number;
        type: number;
    };
    description: string;
    zigbeeCommandOptions?: {
        manufacturerCode?: number;
        disableDefaultResponse?: boolean;
    };
    access?: 'STATE' | 'STATE_GET' | 'ALL';
    unit?: string;
    endpoint?: string;
    endpoints?: string[];
    reporting?: ReportingConfigWithoutAttribute;
    valueMin?: number;
    valueMax?: number;
    valueStep?: number;
    scale?: number;
    label?: string;
}
export declare function numeric(args: NumericArgs): ModernExtend;
export interface BinaryArgs {
    name: string;
    valueOn: [string | boolean, unknown];
    valueOff: [string | boolean, unknown];
    cluster: string | number;
    attribute: string | {
        ID: number;
        type: number;
    };
    description: string;
    zigbeeCommandOptions?: {
        manufacturerCode: number;
    };
    endpoint?: string;
    reporting?: ReportingConfig;
    access?: 'STATE' | 'STATE_GET' | 'ALL';
}
export declare function binary(args: BinaryArgs): ModernExtend;
export interface ActionEnumLookupArgs {
    lookup: KeyValue;
    cluster: string | number;
    attribute: string | {
        ID: number;
        type: number;
    };
    endpointNames?: string[];
}
export declare function actionEnumLookup(args: ActionEnumLookupArgs): ModernExtend;
export declare function forcePowerSource(args: {
    powerSource: 'Mains (single phase)' | 'Battery';
}): ModernExtend;
export interface QuirkAddEndpointClusterArgs {
    endpointID: number;
    inputClusters?: string[] | number[];
    outputClusters?: string[] | number[];
}
export declare function quirkAddEndpointCluster(args: QuirkAddEndpointClusterArgs): ModernExtend;
export declare function quirkCheckinInterval(timeout: number | keyof typeof timeLookup): ModernExtend;
export declare function reconfigureReportingsOnDeviceAnnounce(): ModernExtend;
export declare function customTimeResponse(start: '1970_UTC' | '2000_LOCAL'): ModernExtend;
export declare function forceDeviceType(args: {
    type: 'EndDevice' | 'Router';
}): ModernExtend;
export declare function deviceEndpoints(args: {
    endpoints: {
        [n: string]: number;
    };
}): ModernExtend;
export declare function ota(args: {
    definition: DefinitionOta;
}): ModernExtend;
export declare function temperature(args?: Partial<NumericArgs>): ModernExtend;
export declare function humidity(args?: Partial<NumericArgs>): ModernExtend;
export declare function co2(args?: Partial<NumericArgs>): ModernExtend;
export declare function batteryPercentage(args?: Partial<NumericArgs>): ModernExtend;
export declare function pressure(args?: Partial<NumericArgs>): ModernExtend;
export {};
//# sourceMappingURL=modernExtend.d.ts.map