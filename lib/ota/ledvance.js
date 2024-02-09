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
const updateCheckUrl = 'https://api.update.ledvance.com/v1/zigbee/firmwares/newer';
const updateDownloadUrl = 'https://api.update.ledvance.com/v1/zigbee/firmwares/download';
const common = __importStar(require("./common"));
const axios = common.getAxios();
/**
 * Helper functions
 */
async function getImageMeta(current, logger, device) {
    logger.debug(`LedvanceOTA: call getImageMeta for ${device.modelID}`);
    const url = `${updateCheckUrl}?company=${current.manufacturerCode}&product=${current.imageType}&version=0.0.0`;
    const { data } = await axios.get(url);
    // Since URL is product-specific, var checking is soft-fail here ("images unavailable")
    if (!data?.firmwares?.length) {
        return null;
    }
    // Ledvance's API docs state the checksum should be `sha_256` but it is actually `shA256`
    const { identity, fullName, length, shA256: sha256 } = data.firmwares[0];
    const fileVersionMatch = /\/(\d+)\//.exec(fullName);
    const fileVersion = parseInt(`0x${fileVersionMatch[1]}`, 16);
    const versionString = `${identity.version.major}.${identity.version.minor}.${identity.version.build}.${identity.version.revision}`;
    return {
        fileVersion,
        fileSize: length,
        url: `${updateDownloadUrl}?company=${identity.company}&product=${identity.product}&version=${versionString}`,
        sha256,
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
//# sourceMappingURL=ledvance.js.map