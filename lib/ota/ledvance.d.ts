import { Zh, Logger, Ota } from '../types';
/**
 * Helper functions
 */
export declare function getImageMeta(current: Ota.ImageInfo, logger: Logger, device: Zh.Device): Promise<Ota.ImageMeta>;
/**
 * Interface implementation
 */
export declare function isUpdateAvailable(device: Zh.Device, logger: Logger, requestPayload?: Ota.ImageInfo): Promise<{
    available: boolean;
    currentFileVersion: number;
    otaFileVersion: number;
}>;
export declare function updateToLatest(device: Zh.Device, logger: Logger, onProgress: Ota.OnProgress): Promise<number>;
//# sourceMappingURL=ledvance.d.ts.map