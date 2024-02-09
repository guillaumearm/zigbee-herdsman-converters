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
exports.getAxios = exports.getNewImage = exports.updateToLatest = exports.isNewImageAvailable = exports.isUpdateAvailable = exports.parseImage = exports.getOverrideIndexFile = exports.processCustomCaBundle = exports.getFirmwareFile = exports.readLocalFile = exports.isValidUrl = exports.setDataDir = exports.upgradeFileIdentifier = void 0;
const crypto_1 = __importDefault(require("crypto"));
const https_proxy_agent_1 = require("https-proxy-agent");
const assert_1 = __importDefault(require("assert"));
const buffer_crc32_1 = __importDefault(require("buffer-crc32"));
const axios_1 = __importDefault(require("axios"));
const URI = __importStar(require("uri-js"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const zigbee_herdsman_1 = require("zigbee-herdsman");
const https_1 = __importDefault(require("https"));
const tls_1 = __importDefault(require("tls"));
let dataDir = null;
const maxTimeout = 2147483647; // +- 24 days
const imageBlockResponseDelay = 250;
const endRequestCodeLookup = {
    0x00: 'success',
    0x95: 'aborted by device',
    0x7E: 'not authorized',
    0x96: 'invalid image',
    0x97: 'no data available',
    0x98: 'no image available',
    0x80: 'malformed command',
    0x81: 'unsupported cluster command',
    0x99: 'requires more image files',
};
exports.upgradeFileIdentifier = Buffer.from([0x1E, 0xF1, 0xEE, 0x0B]);
const validSilabsCrc = 0x2144DF1C;
const eblTagHeader = 0x0;
const eblTagEncHeader = 0xfb05;
const eblTagEnd = 0xfc04;
const eblPadding = 0xff;
const eblImageSignature = 0xe350;
const gblTagHeader = 0xeb17a603;
const gblTagEnd = 0xfc0404fc;
/**
 * Helper functions
 */
const setDataDir = (dir) => {
    dataDir = dir;
};
exports.setDataDir = setDataDir;
function isValidUrl(url) {
    let parsed;
    try {
        parsed = URI.parse(url);
    }
    catch (_) {
        return false;
    }
    return parsed.scheme === 'http' || parsed.scheme === 'https';
}
exports.isValidUrl = isValidUrl;
function readLocalFile(fileName, logger) {
    // If the file name is not a full path, then treat it as a relative to the data directory
    if (!path_1.default.isAbsolute(fileName) && dataDir) {
        fileName = path_1.default.join(dataDir, fileName);
    }
    logger.debug(`OTA: Getting local firmware file '${fileName}'`);
    return fs_1.default.readFileSync(fileName);
}
exports.readLocalFile = readLocalFile;
async function getFirmwareFile(image, logger) {
    const urlOrName = image.url;
    // First try to download firmware file with the URL provided
    if (isValidUrl(urlOrName)) {
        logger.debug(`OTA: Downloading firmware image from '${urlOrName}'`);
        return await getAxios().get(urlOrName, { responseType: 'arraybuffer' });
    }
    logger.debug(`OTA: Try to read firmware image from local file '${urlOrName}'`);
    return { data: readLocalFile(urlOrName, logger) };
}
exports.getFirmwareFile = getFirmwareFile;
async function processCustomCaBundle(uri) {
    let rawCaBundle = '';
    if (isValidUrl(uri)) {
        rawCaBundle = (await axios_1.default.get(uri)).data;
    }
    else {
        if (!path_1.default.isAbsolute(uri) && dataDir) {
            uri = path_1.default.join(dataDir, uri);
        }
        rawCaBundle = fs_1.default.readFileSync(uri, { encoding: 'utf-8' });
    }
    // Parse the raw CA bundle into clean, separate CA certs
    const lines = rawCaBundle.split('\n');
    const caBundle = [];
    let inCert = false;
    let currentCert = '';
    for (const line of lines) {
        if (line === '-----BEGIN CERTIFICATE-----') {
            inCert = true;
        }
        if (inCert) {
            currentCert = currentCert + line + '\n';
        }
        if (line === '-----END CERTIFICATE-----') {
            inCert = false;
            caBundle.push(currentCert);
            currentCert = '';
        }
    }
    return caBundle;
}
exports.processCustomCaBundle = processCustomCaBundle;
async function getOverrideIndexFile(urlOrName) {
    if (isValidUrl(urlOrName)) {
        const { data: index } = await getAxios().get(urlOrName);
        if (!index) {
            throw new Error(`OTA: Error getting override index file from '${urlOrName}'`);
        }
        return index;
    }
    return JSON.parse(fs_1.default.readFileSync(urlOrName, 'utf-8'));
}
exports.getOverrideIndexFile = getOverrideIndexFile;
/**
 * OTA functions
 */
function getOTAEndpoint(device) {
    return device.endpoints.find((e) => e.supportsOutputCluster('genOta'));
}
function parseSubElement(buffer, position) {
    const tagID = buffer.readUInt16LE(position);
    const length = buffer.readUInt32LE(position + 2);
    const data = buffer.slice(position + 6, position + 6 + length);
    return { tagID, length, data };
}
function parseImage(buffer) {
    const header = {
        otaUpgradeFileIdentifier: buffer.subarray(0, 4),
        otaHeaderVersion: buffer.readUInt16LE(4),
        otaHeaderLength: buffer.readUInt16LE(6),
        otaHeaderFieldControl: buffer.readUInt16LE(8),
        manufacturerCode: buffer.readUInt16LE(10),
        imageType: buffer.readUInt16LE(12),
        fileVersion: buffer.readUInt32LE(14),
        zigbeeStackVersion: buffer.readUInt16LE(18),
        otaHeaderString: buffer.toString('utf8', 20, 52),
        totalImageSize: buffer.readUInt32LE(52),
    };
    let headerPos = 56;
    if (header.otaHeaderFieldControl & 1) {
        header.securityCredentialVersion = buffer.readUInt8(headerPos);
        headerPos += 1;
    }
    if (header.otaHeaderFieldControl & 2) {
        header.upgradeFileDestination = buffer.subarray(headerPos, headerPos + 8);
        headerPos += 8;
    }
    if (header.otaHeaderFieldControl & 4) {
        header.minimumHardwareVersion = buffer.readUInt16LE(headerPos);
        headerPos += 2;
        header.maximumHardwareVersion = buffer.readUInt16LE(headerPos);
        headerPos += 2;
    }
    const raw = buffer.slice(0, header.totalImageSize);
    (0, assert_1.default)(Buffer.compare(header.otaUpgradeFileIdentifier, exports.upgradeFileIdentifier) === 0, `Not an OTA file`);
    let position = header.otaHeaderLength;
    const elements = [];
    while (position < header.totalImageSize) {
        const element = parseSubElement(buffer, position);
        elements.push(element);
        position += element.data.length + 6;
    }
    (0, assert_1.default)(position === header.totalImageSize, `Size mismatch`);
    return { header, elements, raw };
}
exports.parseImage = parseImage;
function validateImageData(image) {
    for (const element of image.elements) {
        const { data } = element;
        if (data.readUInt32BE(0) === gblTagHeader) {
            validateSilabsGbl(data);
        }
        else {
            const tag = data.readUInt16BE(0);
            if ((tag === eblTagHeader && data.readUInt16BE(6) === eblImageSignature) || tag === eblTagEncHeader) {
                validateSilabsEbl(data);
            }
        }
    }
}
function validateSilabsEbl(data) {
    const dataLength = data.length;
    let position = 0;
    while (position + 4 <= dataLength) {
        const tag = data.readUInt16BE(position);
        const len = data.readUInt16BE(position + 2);
        position += 4 + len;
        if (tag !== eblTagEnd) {
            continue;
        }
        for (let position2 = position; position2 < dataLength; position2++) {
            (0, assert_1.default)(data.readUInt8(position2) === eblPadding, `Image padding contains invalid bytes`);
        }
        const calculatedCrc32 = buffer_crc32_1.default.unsigned(data.slice(0, position));
        (0, assert_1.default)(calculatedCrc32 === validSilabsCrc, `Image CRC-32 is invalid`);
        return;
    }
    throw new Error(`OTA: Image is truncated, not long enough to contain a valid tag`);
}
function validateSilabsGbl(data) {
    const dataLength = data.length;
    let position = 0;
    while (position + 8 <= dataLength) {
        const tag = data.readUInt32BE(position);
        const len = data.readUInt32LE(position + 4);
        position += 8 + len;
        if (tag !== gblTagEnd) {
            continue;
        }
        const calculatedCrc32 = buffer_crc32_1.default.unsigned(data.slice(0, position));
        (0, assert_1.default)(calculatedCrc32 === validSilabsCrc, `Image CRC-32 is invalid`);
        return;
    }
    throw new Error(`OTA: Image is truncated, not long enough to contain a valid tag`);
}
function cancelWaiters(waiters) {
    for (const waiter of Object.values(waiters)) {
        if (waiter) {
            waiter.cancel();
        }
    }
}
function sendQueryNextImageResponse(endpoint, image, requestTransactionSequenceNumber, logger) {
    const payload = {
        status: 0,
        manufacturerCode: image.header.manufacturerCode,
        imageType: image.header.imageType,
        fileVersion: image.header.fileVersion,
        imageSize: image.header.totalImageSize,
    };
    endpoint.commandResponse('genOta', 'queryNextImageResponse', payload, null, requestTransactionSequenceNumber).catch((e) => {
        logger.debug(`OTA: Failed to send queryNextImageResponse (${e.message})`);
    });
}
function imageNotify(endpoint) {
    return endpoint.commandResponse('genOta', 'imageNotify', { payloadType: 0, queryJitter: 100 }, { sendPolicy: 'immediate' });
}
async function requestOTA(endpoint) {
    // Some devices (e.g. Insta) take very long trying to discover the correct coordinator EP for OTA.
    const queryNextImageRequest = endpoint.waitForCommand('genOta', 'queryNextImageRequest', null, 60000);
    try {
        await imageNotify(endpoint);
        // @ts-expect-error
        return await queryNextImageRequest.promise;
    }
    catch (e) {
        queryNextImageRequest.cancel();
        throw new Error(`OTA: Device didn't respond to OTA request`);
    }
}
function getImageBlockResponsePayload(image, imageBlockRequest, pageOffset, pageSize, logger) {
    let start = imageBlockRequest.payload.fileOffset + pageOffset;
    // When the data size is too big, OTA gets unstable, so default it to 50 bytes maximum.
    // - Insta devices, OTA only works for data sizes 40 and smaller (= manufacturerCode 4474).
    // - Legrand devices (newer firmware) require up to 64 bytes (= manufacturerCode 4129).
    let maximumDataSize = 50;
    if (imageBlockRequest.payload.manufacturerCode === 4474)
        maximumDataSize = 40;
    else if (imageBlockRequest.payload.manufacturerCode === 4129)
        maximumDataSize = Infinity;
    let dataSize = Math.min(maximumDataSize, imageBlockRequest.payload.maximumDataSize);
    // Hack for https://github.com/Koenkk/zigbee-OTA/issues/328 (Legrand OTA not working)
    if (imageBlockRequest.payload.manufacturerCode === 4129 &&
        imageBlockRequest.payload.fileOffset === 50 &&
        imageBlockRequest.payload.maximumDataSize === 12) {
        logger.info(`OTA: Detected Legrand firmware issue, attempting to reset the OTA stack`);
        // The following vector seems to buffer overflow the device to reset the OTA stack!
        start = 78;
        dataSize = 64;
    }
    if (pageSize) {
        dataSize = Math.min(dataSize, pageSize - pageOffset);
    }
    let end = start + dataSize;
    if (end > image.raw.length) {
        end = image.raw.length;
    }
    logger.debug(`OTA: Request offsets:` +
        ` fileOffset=${imageBlockRequest.payload.fileOffset}` +
        ` pageOffset=${pageOffset}` +
        ` dataSize=${imageBlockRequest.payload.maximumDataSize}`);
    logger.debug(`OTA: Payload offsets: start=${start} end=${end} dataSize=${dataSize}`);
    return {
        status: 0,
        manufacturerCode: imageBlockRequest.payload.manufacturerCode,
        imageType: imageBlockRequest.payload.imageType,
        fileVersion: imageBlockRequest.payload.fileVersion,
        fileOffset: start,
        dataSize: end - start,
        data: image.raw.slice(start, end),
    };
}
function callOnProgress(startTime, lastUpdate, imageBlockRequest, image, logger, onProgress) {
    const now = Date.now();
    // Call on progress every +- 30 seconds
    if (lastUpdate === null || (now - lastUpdate) > 30000) {
        const totalDuration = (now - startTime) / 1000; // in seconds
        const bytesPerSecond = imageBlockRequest.payload.fileOffset / totalDuration;
        const remaining = (image.header.totalImageSize - imageBlockRequest.payload.fileOffset) / bytesPerSecond;
        let percentage = imageBlockRequest.payload.fileOffset / image.header.totalImageSize;
        percentage = Math.round(percentage * 10000) / 100;
        logger.debug(`OTA: Update at ${percentage}%, remaining ${remaining} seconds`);
        onProgress(percentage, remaining === Infinity ? null : remaining);
        return now;
    }
    else {
        return lastUpdate;
    }
}
async function isUpdateAvailable(device, logger, requestPayload, isNewImageAvailable = null, getImageMeta = null) {
    logger.debug(`OTA: Checking if an update is available for '${device.ieeeAddr}' (${device.modelID})`);
    if (requestPayload === null) {
        const endpoint = getOTAEndpoint(device);
        (0, assert_1.default)(endpoint != null, `Failed to find an endpoint which supports the OTA cluster`);
        logger.debug(`OTA: Using endpoint '${endpoint.ID}'`);
        const request = await requestOTA(endpoint);
        logger.debug(`OTA: Got request '${JSON.stringify(request.payload)}'`);
        requestPayload = request.payload;
    }
    const availableResult = await isNewImageAvailable(requestPayload, logger, device, getImageMeta);
    logger.debug(`OTA: Update available for '${device.ieeeAddr}' (${device.modelID}): ${availableResult.available < 0 ? 'YES' : 'NO'}`);
    if (availableResult.available > 0) {
        logger.warn(`OTA: Firmware on '${device.ieeeAddr}' (${device.modelID}) is newer than latest firmware online.`);
    }
    return { ...availableResult, available: availableResult.available < 0 };
}
exports.isUpdateAvailable = isUpdateAvailable;
async function isNewImageAvailable(current, logger, device, getImageMeta) {
    const currentS = JSON.stringify(current);
    logger.debug(`OTA: Is new image available for '${device.ieeeAddr}' (${device.modelID}), current '${currentS}'`);
    const meta = await getImageMeta(current, logger, device);
    // Soft-fail because no images in repo/URL for specified device
    if (!meta) {
        const metaS = `device '${device.modelID}', hardwareVersion '${device.hardwareVersion}', manufacturerName ${device.manufacturerName}`;
        logger.warn(`OTA: Images currently unavailable for ${metaS}, ${currentS}'`);
        return {
            available: 0,
            currentFileVersion: current.fileVersion,
            otaFileVersion: current.fileVersion,
        };
    }
    logger.debug(`OTA: Is new image available for '${device.ieeeAddr}' (${device.modelID}), latest meta '${JSON.stringify(meta)}'`);
    // Negative number means the new firmware is 'newer' than current one
    return {
        available: meta.force ? -1 : Math.sign(current.fileVersion - meta.fileVersion),
        currentFileVersion: current.fileVersion,
        otaFileVersion: meta.fileVersion,
    };
}
exports.isNewImageAvailable = isNewImageAvailable;
async function updateToLatest(device, logger, onProgress, getNewImage, getImageMeta = null, downloadImage = null) {
    logger.debug(`OTA: Updating to latest '${device.ieeeAddr}' (${device.modelID})`);
    const endpoint = getOTAEndpoint(device);
    (0, assert_1.default)(endpoint != null, `Failed to find an endpoint which supports the OTA cluster`);
    logger.debug(`OTA: Using endpoint '${endpoint.ID}'`);
    const request = await requestOTA(endpoint);
    logger.debug(`OTA: Got request '${JSON.stringify(request.payload)}'`);
    const image = await getNewImage(request.payload, logger, device, getImageMeta, downloadImage);
    logger.debug(`OTA: Got new image for '${device.ieeeAddr}' (${device.modelID})`);
    const waiters = {};
    let lastUpdate = null;
    let lastImageBlockResponse = null;
    const startTime = Date.now();
    return new Promise((resolve, reject) => {
        const answerNextImageBlockOrPageRequest = () => {
            let imageBlockOrPageRequestTimeoutMs = 150000;
            // increase the upgradeEndReq wait time to solve the problem of OTA timeout failure of Sonoff Devices
            // (https://github.com/Koenkk/zigbee-herdsman-converters/issues/6657)
            if (request.payload.manufacturerCode == 4742 && request.payload.imageType == 8199) {
                imageBlockOrPageRequestTimeoutMs = 3600000;
            }
            // Bosch transmits the firmware updates in the background in their native implementation.
            // According to the app, this can take up to 2 days. Therefore, we assume to get at least
            // one package request per hour from the device here.
            if (request.payload.manufacturerCode == zigbee_herdsman_1.Zcl.ManufacturerCode.ROBERT_BOSCH_GMBH) {
                imageBlockOrPageRequestTimeoutMs = 60 * 60 * 1000;
            }
            const imageBlockRequest = endpoint.waitForCommand('genOta', 'imageBlockRequest', null, imageBlockOrPageRequestTimeoutMs);
            const imagePageRequest = endpoint.waitForCommand('genOta', 'imagePageRequest', null, imageBlockOrPageRequestTimeoutMs);
            waiters.imageBlockOrPageRequest = {
                promise: Promise.race([imageBlockRequest.promise, imagePageRequest.promise]),
                cancel: () => {
                    imageBlockRequest.cancel();
                    imagePageRequest.cancel();
                },
            };
            waiters.imageBlockOrPageRequest.promise.then((imageBlockOrPageRequest) => {
                let pageOffset = 0;
                let pageSize = 0;
                const sendImageBlockResponse = (imageBlockRequest, thenCallback, transactionSequenceNumber) => {
                    const payload = getImageBlockResponsePayload(image, imageBlockRequest, pageOffset, pageSize, logger);
                    const now = Date.now();
                    const timeSinceLastImageBlockResponse = now - lastImageBlockResponse;
                    // Reduce network congestion by only sending imageBlockResponse min every 250ms.
                    const cooldownTime = Math.max(imageBlockResponseDelay - timeSinceLastImageBlockResponse, 0);
                    setTimeout(() => {
                        endpoint.commandResponse('genOta', 'imageBlockResponse', payload, null, transactionSequenceNumber).then(() => {
                            pageOffset += payload.dataSize;
                            lastImageBlockResponse = Date.now();
                            thenCallback();
                        }, (e) => {
                            // Shit happens, device will probably do a new imageBlockRequest so don't care.
                            lastImageBlockResponse = Date.now();
                            thenCallback();
                            logger.debug(`OTA: Image block response failed (${e.message})`);
                        });
                    }, cooldownTime);
                    lastUpdate = callOnProgress(startTime, lastUpdate, imageBlockRequest, image, logger, onProgress);
                };
                if ('pageSize' in imageBlockOrPageRequest.payload) {
                    // imagePageRequest
                    pageSize = imageBlockOrPageRequest.payload.pageSize;
                    const handleImagePageRequestBlocks = (imagePageRequest) => {
                        if (pageOffset < pageSize) {
                            sendImageBlockResponse(imagePageRequest, () => handleImagePageRequestBlocks(imagePageRequest), imagePageRequest.header.transactionSequenceNumber);
                        }
                        else {
                            answerNextImageBlockOrPageRequest();
                        }
                    };
                    handleImagePageRequestBlocks(imageBlockOrPageRequest);
                }
                else {
                    // imageBlockRequest
                    sendImageBlockResponse(imageBlockOrPageRequest, answerNextImageBlockOrPageRequest, imageBlockOrPageRequest.header.transactionSequenceNumber);
                }
            }, () => {
                cancelWaiters(waiters);
                reject(new Error(`OTA: Timeout, device did not request any image blocks`));
            });
        };
        const answerNextImageRequest = () => {
            waiters.nextImageRequest = endpoint.waitForCommand('genOta', 'queryNextImageRequest', null, maxTimeout);
            waiters.nextImageRequest.promise.then((payload) => {
                answerNextImageRequest();
                sendQueryNextImageResponse(endpoint, image, payload.header.transactionSequenceNumber, logger);
            });
        };
        // No need to timeout here, will already be done in answerNextImageBlockRequest
        waiters.upgradeEndRequest = endpoint.waitForCommand('genOta', 'upgradeEndRequest', null, maxTimeout);
        waiters.upgradeEndRequest.promise.then((data) => {
            logger.debug(`OTA: Got upgrade end request for '${device.ieeeAddr}' (${device.modelID}): ${JSON.stringify(data.payload)}`);
            cancelWaiters(waiters);
            if (data.payload.status === 0) {
                const payload = {
                    manufacturerCode: image.header.manufacturerCode, imageType: image.header.imageType,
                    fileVersion: image.header.fileVersion, currentTime: 0, upgradeTime: 1,
                };
                endpoint.commandResponse('genOta', 'upgradeEndResponse', payload, null, data.header.transactionSequenceNumber).then(() => {
                    logger.debug(`OTA: Update succeeded, waiting for device announce`);
                    onProgress(100, null);
                    let timer = null;
                    const cb = () => {
                        logger.debug(`OTA: Got device announce or timed out, call resolve`);
                        clearInterval(timer);
                        device.removeListener('deviceAnnounce', cb);
                        resolve(image.header.fileVersion);
                    };
                    timer = setTimeout(cb, 120 * 1000); // timeout after 2 minutes
                    device.once('deviceAnnounce', cb);
                }, (e) => {
                    const message = `OTA: Upgrade end response failed (${e.message})`;
                    logger.debug(message);
                    reject(new Error(message));
                });
            }
            else {
                // @ts-expect-error
                const error = `OTA: Update failed with reason: '${endRequestCodeLookup[data.payload.status]}'`;
                logger.debug(error);
                reject(new Error(error));
            }
        });
        logger.debug(`OTA: Starting upgrade`);
        answerNextImageBlockOrPageRequest();
        answerNextImageRequest();
        // Notify client once more about new image, client should start sending queryNextImageRequest now
        imageNotify(endpoint).catch((e) => logger.debug(`OTA: Image notify failed (${e})`));
    });
}
exports.updateToLatest = updateToLatest;
async function getNewImage(current, logger, device, getImageMeta, downloadImage) {
    const meta = await getImageMeta(current, logger, device);
    (0, assert_1.default)(meta, `Images for '${device.ieeeAddr}' (${device.modelID}) currently unavailable`);
    logger.debug(`OTA: Getting new image for '${device.ieeeAddr}' (${device.modelID}), latest meta ${JSON.stringify(meta)}`);
    (0, assert_1.default)(meta.fileVersion > current.fileVersion || meta.force, `No new image available`);
    const download = downloadImage ? await downloadImage(meta, logger) :
        await getAxios().get(meta.url, { responseType: 'arraybuffer' });
    const checksum = (meta.sha512 || meta.sha256);
    if (checksum) {
        const hash = crypto_1.default.createHash(meta.sha512 ? 'sha512' : 'sha256');
        hash.update(download.data);
        (0, assert_1.default)(hash.digest('hex') === checksum, `File checksum validation failed`);
        logger.debug(`OTA: Update checksum validation succeeded for '${device.ieeeAddr}' (${device.modelID})`);
    }
    const start = download.data.indexOf(exports.upgradeFileIdentifier);
    const image = parseImage(download.data.slice(start));
    logger.debug(`OTA: Get new image for '${device.ieeeAddr}' (${device.modelID}), image header ${JSON.stringify(image.header)}`);
    (0, assert_1.default)(image.header.fileVersion === meta.fileVersion, `File version mismatch`);
    (0, assert_1.default)(!meta.fileSize || image.header.totalImageSize === meta.fileSize, `Image size mismatch`);
    (0, assert_1.default)(image.header.manufacturerCode === current.manufacturerCode, `Manufacturer code mismatch`);
    (0, assert_1.default)(image.header.imageType === current.imageType, `Image type mismatch`);
    if ('minimumHardwareVersion' in image.header && 'maximumHardwareVersion' in image.header) {
        (0, assert_1.default)(image.header.minimumHardwareVersion <= device.hardwareVersion &&
            device.hardwareVersion <= image.header.maximumHardwareVersion, `Hardware version mismatch`);
    }
    validateImageData(image);
    return image;
}
exports.getNewImage = getNewImage;
function getAxios(caBundle = null) {
    let config = {};
    const httpsAgentOptions = {};
    if (caBundle !== null) {
        // We also include all system default CAs, as setting custom CAs fully replaces the default list
        httpsAgentOptions.ca = [...tls_1.default.rootCertificates, ...caBundle];
    }
    const proxy = process.env.HTTPS_PROXY;
    if (proxy) {
        config = {
            proxy: false,
            httpsAgent: new https_proxy_agent_1.HttpsProxyAgent(proxy, httpsAgentOptions),
            headers: {
                'Accept-Encoding': '*',
            },
        };
    }
    else {
        config = {
            httpsAgent: new https_1.default.Agent(httpsAgentOptions),
        };
    }
    const axiosInstance = axios_1.default.create(config);
    axiosInstance.defaults.maxRedirects = 0; // Set to 0 to prevent automatic redirects
    // Add work with 302 redirects without hostname in Location header
    axiosInstance.interceptors.response.use((response) => response, (error) => {
        // get domain from basic url
        if (error.response && [301, 302].includes(error.response.status)) {
            let redirectUrl = error.response.headers.location;
            try {
                const parsedUrl = new URL(redirectUrl);
                if (!parsedUrl.protocol || !parsedUrl.host) {
                    throw new Error(`OTA: Get Axios, no scheme or domain`);
                }
            }
            catch {
                // Prepend scheme and domain from the original request's base URL
                const baseURL = new URL(error.config.url);
                redirectUrl = `${baseURL.origin}${redirectUrl}`;
            }
            return axiosInstance.get(redirectUrl, { responseType: error.config.responseType || 'arraybuffer' });
        }
    });
    return axiosInstance;
}
exports.getAxios = getAxios;
exports.upgradeFileIdentifier = exports.upgradeFileIdentifier;
exports.isUpdateAvailable = isUpdateAvailable;
exports.parseImage = parseImage;
exports.validateImageData = validateImageData;
exports.isNewImageAvailable = isNewImageAvailable;
exports.updateToLatest = updateToLatest;
exports.getNewImage = getNewImage;
exports.getAxios = getAxios;
exports.isValidUrl = isValidUrl;
exports.setDataDir = exports.setDataDir;
exports.getFirmwareFile = getFirmwareFile;
exports.readLocalFile = readLocalFile;
exports.getOverrideIndexFile = getOverrideIndexFile;
//# sourceMappingURL=common.js.map