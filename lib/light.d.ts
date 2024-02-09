import { Zh, Tz, Logger } from './types';
export declare function readColorAttributes(entity: Zh.Endpoint | Zh.Group, meta: Tz.Meta, additionalAttributes?: string[]): string[];
export declare function findColorTempRange(entity: Zh.Endpoint | Zh.Group, logger: Logger): number[];
export declare function clampColorTemp(colorTemp: number, colorTempMin: number, colorTempMax: number, logger: Logger): number;
export declare function configure(device: Zh.Device, coordinatorEndpoint: Zh.Endpoint, logger: Logger, readColorTempMinMaxAttribute: boolean): Promise<void>;
//# sourceMappingURL=light.d.ts.map