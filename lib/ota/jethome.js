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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIndexOverride = exports.updateToLatest = exports.isUpdateAvailable = exports.getImageMeta = void 0;
const baseurl = 'https://fw.jethome.ru';
const deviceurl = `${baseurl}/api/devices/`;
const common = __importStar(require("./common"));
const axios = common.getAxios();
let overrideIndexFileName = null;
/**
 * Helper functions
 */
async function getIndex(logger, modelID) {
    if (overrideIndexFileName) {
        logger.debug(`JetHomeOTA: Loading override index ${overrideIndexFileName}`);
        const overrideIndex = await common.getOverrideIndexFile(overrideIndexFileName);
        return overrideIndex;
    }
    else {
        const url = `${deviceurl}${modelID}/info`;
        const { data: index } = await axios.get(url);
        if (!index) {
            throw new Error(`JetHomeOTA: Error getting firmware page at ${url}`);
        }
        logger.debug(`JetHomeOTA: downloaded index for ${modelID}`);
        return index;
    }
}
async function getImageMeta(current, logger, device) {
    logger.debug(`JetHomeOTA: call getImageMeta for ${device.modelID}`);
    const images = await getIndex(logger, device.modelID);
    // XXX: this is assumed to always be present even for devices that support OTA but without images yet available?
    if (!images?.latest_firmware?.release?.images) {
        throw new Error(`JetHomeOTA: Error getting firmware images`);
    }
    // we need to return the latest_firmware.release.urls.zigbee.ota
    const jetimage = images.latest_firmware.release.images['zigbee.ota'];
    if (!jetimage) {
        return null;
    }
    logger.debug(`JetHomeOTA: version: ${images.latest_firmware.release.version} size: ${jetimage.filesize} url: ${baseurl + jetimage.url}`);
    return {
        fileVersion: Number(images.latest_firmware.release.version),
        fileSize: jetimage.filesize,
        url: baseurl + jetimage.url,
    };
}
exports.getImageMeta = getImageMeta;
/**
 * Interface implementation
 */
async function isUpdateAvailable(device, logger, requestPayload = null) {
    return common.isUpdateAvailable(device, logger, requestPayload, common.isNewImageAvailable, getImageMeta);
}
exports.isUpdateAvailable = isUpdateAvailable;
async function updateToLatest(device, logger, onProgress) {
    return common.updateToLatest(device, logger, onProgress, common.getNewImage, getImageMeta, common.getFirmwareFile);
}
exports.updateToLatest = updateToLatest;
const useIndexOverride = (indexFileName) => {
    overrideIndexFileName = indexFileName;
};
exports.useIndexOverride = useIndexOverride;
exports.getImageMeta = getImageMeta;
exports.isUpdateAvailable = isUpdateAvailable;
exports.updateToLatest = updateToLatest;
exports.useIndexOverride = exports.useIndexOverride;
//# sourceMappingURL=jethome.js.map