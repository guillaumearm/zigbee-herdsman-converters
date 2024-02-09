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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateToLatest = exports.isUpdateAvailable = exports.getImageMeta = void 0;
const firmwareHtmlPageUrl = 'http://fwu.ubisys.de/smarthome/OTA/release/index';
const imageRegex = /10F2-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{8})\S*ota1?\.zigbee/gi;
const url_1 = __importDefault(require("url"));
const common = __importStar(require("./common"));
const axios = common.getAxios();
/**
 * Ubisys switched firmware format when the switched to their newer
 *  `Ubisys Compact7B Stack` (I think it was 7B, could have bene earlier)
 *
 * Their firmware index lists a *.ota1.zigbee firmware for those devices that
 *  is in the old firmware format that will update the device to use the new
 *  format. The matching logisch seems to generally work, however as reported in
 *  Koenkk/zigbee-OTA#329 there still seems to be a bug lurking somewhere.
 */
/**
 * Helper functions
 */
async function getImageMeta(current, logger, device) {
    logger.debug(`UbisysOTA: call getImageMeta for ${device.modelID}`);
    const { status, data: pageHtml } = await axios.get(firmwareHtmlPageUrl, { maxContentLength: -1 });
    if (status !== 200 || !pageHtml?.length) {
        throw new Error(`UbisysOTA: Error getting firmware page at ${firmwareHtmlPageUrl}`);
    }
    logger.debug(`UbisysOTA: got firmware page, status: ${status}, data.length: ${pageHtml.length}`);
    imageRegex.lastIndex = 0; // reset (global) regex for next exec to match from the beginning again
    let imageMatch = imageRegex.exec(pageHtml);
    let highestMatch = null;
    while (imageMatch != null) {
        logger.debug(`UbisysOTA: image found: ${imageMatch[0]}`);
        if (parseInt(imageMatch[1], 16) === current.imageType &&
            parseInt(imageMatch[2], 16) <= device.hardwareVersion && device.hardwareVersion <= parseInt(imageMatch[3], 16)) {
            if (highestMatch === null || parseInt(highestMatch[4], 16) < parseInt(imageMatch[4], 16)) {
                highestMatch = imageMatch;
            }
        }
        imageMatch = imageRegex.exec(pageHtml);
    }
    if (!highestMatch) {
        return null;
    }
    return {
        hardwareVersionMin: parseInt(highestMatch[2], 16),
        hardwareVersionMax: parseInt(highestMatch[3], 16),
        fileVersion: parseInt(highestMatch[4], 16),
        url: url_1.default.resolve(firmwareHtmlPageUrl, highestMatch[0]),
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
//# sourceMappingURL=ubisys.js.map