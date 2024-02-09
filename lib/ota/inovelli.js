"use strict";
/**
 * Helper functions
 *
 * @packageDocumentation
 */
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
exports.updateToLatest = exports.isUpdateAvailable = exports.getImageMeta = void 0;
const url = 'https://files.inovelli.com/firmware/firmware.json';
const common = __importStar(require("./common"));
const axios = common.getAxios();
async function getImageMeta(current, logger, device) {
    logger.debug(`InovelliOTA: call getImageMeta for ${device.modelID}`);
    const { data: images } = await axios.get(url);
    if (!images) {
        throw new Error(`InovelliOTA: Error getting firmware page at ${url}`);
    }
    if (Object.keys(images).indexOf(device.modelID) === -1) {
        return null;
    }
    // Force for now.  There is only beta firmware at the moment.
    const useBetaChannel = true;
    const image = images[device.modelID]
        .filter((i) => (useBetaChannel ? true : i.channel === 'production'))
        .sort((a, b) => {
        const aRadix = a.version.match(/[A-F]/) ? 16 : 10;
        const bRadix = b.version.match(/[A-F]/) ? 16 : 10;
        // @ts-expect-error
        const aVersion = parseFloat(a.version, aRadix);
        // @ts-expect-error
        const bVersion = parseFloat(b.version, bRadix);
        // doesn't matter which order they are in
        if (aVersion < bVersion) {
            return -1;
        }
        if (aVersion > bVersion) {
            return 1;
        }
        return 0;
    })
        .pop();
    if (!image) {
        logger.warn(`OTA: No image found in the ${useBetaChannel ? 'beta' : 'production'} channel for device '${device.modelID}'`);
        return null;
    }
    // version in the firmware removes the zero padding and support hex versioning
    return {
        // @ts-expect-error
        fileVersion: parseFloat(image.version, image.version.match(/[A-F]/) ? 16 : 10),
        url: image.firmware,
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
    return common.updateToLatest(device, logger, onProgress, common.getNewImage, getImageMeta);
}
exports.updateToLatest = updateToLatest;
exports.isUpdateAvailable = isUpdateAvailable;
exports.updateToLatest = updateToLatest;
//# sourceMappingURL=inovelli.js.map