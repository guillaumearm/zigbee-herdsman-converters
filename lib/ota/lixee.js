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
exports.updateToLatest = exports.isUpdateAvailable = exports.getImageMeta = void 0;
const firmwareOrigin = 'https://api.github.com/repos/fairecasoimeme/Zlinky_TIC/releases';
const common = __importStar(require("./common"));
const axios = common.getAxios();
/**
 * Helper functions
 */
async function getImageMeta(current, logger, device) {
    logger.debug(`LixeeOTA: call getImageMeta for ${device.modelID}`);
    const { data: releases } = await axios.get(firmwareOrigin);
    if (!releases?.length) {
        throw new Error(`LixeeOTA: Error getting firmware page at ${firmwareOrigin}`);
    }
    let firmURL;
    // Find the most recent OTA file available
    for (const e of releases.sort((a, b) => a.published_at - a.published_at)) {
        if (e.assets) {
            const targetObj = e.assets.find((a) => a.name.endsWith('.ota'));
            if (targetObj && targetObj.browser_download_url) {
                firmURL = targetObj;
                break;
            }
        }
    }
    if (!firmURL) {
        return null;
    }
    logger.info(`LixeeOTA: Using firmware file ` + firmURL.name);
    const image = common.parseImage((await common.getAxios().get(firmURL.browser_download_url, { responseType: 'arraybuffer' })).data);
    return {
        fileVersion: image.header.fileVersion,
        fileSize: firmURL.size,
        url: firmURL.browser_download_url,
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
//# sourceMappingURL=lixee.js.map