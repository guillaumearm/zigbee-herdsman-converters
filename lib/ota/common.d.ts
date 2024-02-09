/// <reference types="node" />
import { Zh, Ota, Logger, KeyValueAny } from '../types';
export declare const upgradeFileIdentifier: Buffer;
type IsNewImageAvailable = (current: Ota.ImageInfo, logger: Logger, device: Zh.Device, getImageMeta: Ota.GetImageMeta) => Promise<{
    available: number;
    currentFileVersion: number;
    otaFileVersion: number;
}>;
type DownloadImage = (meta: Ota.ImageMeta, logger: Logger) => Promise<{
    data: Buffer;
}>;
type GetNewImage = (current: Ota.Version, logger: Logger, device: Zh.Device, getImageMeta: Ota.GetImageMeta, downloadImage: DownloadImage) => Promise<Ota.Image>;
/**
 * Helper functions
 */
export declare const setDataDir: (dir: string) => void;
export declare function isValidUrl(url: string): boolean;
export declare function readLocalFile(fileName: string, logger: Logger): Buffer;
export declare function getFirmwareFile(image: KeyValueAny, logger: Logger): Promise<import("axios").AxiosResponse<any, any> | {
    data: Buffer;
}>;
export declare function processCustomCaBundle(uri: string): Promise<string[]>;
export declare function getOverrideIndexFile(urlOrName: string): Promise<any>;
export declare function parseImage(buffer: Buffer): Ota.Image;
export declare function isUpdateAvailable(device: Zh.Device, logger: Logger, requestPayload: Ota.ImageInfo, isNewImageAvailable?: IsNewImageAvailable, getImageMeta?: Ota.GetImageMeta): Promise<{
    available: boolean;
    currentFileVersion: number;
    otaFileVersion: number;
}>;
export declare function isNewImageAvailable(current: Ota.ImageInfo, logger: Logger, device: Zh.Device, getImageMeta: Ota.GetImageMeta): Promise<{
    available: number;
    currentFileVersion: number;
    otaFileVersion: number;
}>;
export declare function updateToLatest(device: Zh.Device, logger: Logger, onProgress: Ota.OnProgress, getNewImage: GetNewImage, getImageMeta?: Ota.GetImageMeta, downloadImage?: DownloadImage): Promise<number>;
export declare function getNewImage(current: Ota.ImageInfo, logger: Logger, device: Zh.Device, getImageMeta: Ota.GetImageMeta, downloadImage: DownloadImage): Promise<Ota.Image>;
export declare function getAxios(caBundle?: string[]): import("axios").AxiosInstance;
export {};
//# sourceMappingURL=common.d.ts.map