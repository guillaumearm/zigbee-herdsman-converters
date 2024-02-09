/// <reference types="node" />
import { Logger, Zh, Ota, KeyValueAny } from '../types';
export declare function getImageMeta(current: Ota.ImageInfo, logger: Logger, device: Zh.Device): Promise<Ota.ImageMeta>;
export declare function getFirmwareFile(image: KeyValueAny, logger: Logger): Promise<import("axios").AxiosResponse<any, any> | {
    data: Buffer;
}>;
/**
 * Interface implementation
 */
export declare function isUpdateAvailable(device: Zh.Device, logger: Logger, requestPayload?: Ota.ImageInfo): Promise<{
    available: boolean;
    currentFileVersion: number;
    otaFileVersion: number;
}>;
export declare function updateToLatest(device: Zh.Device, logger: Logger, onProgress: Ota.OnProgress): Promise<number>;
export declare const useIndexOverride: (indexFileName: string) => void;
//# sourceMappingURL=zigbeeOTA.d.ts.map