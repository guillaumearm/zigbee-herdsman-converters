"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLogger = exports.logger = void 0;
exports.logger = {
    info: (msg) => console.log(msg),
    warn: (msg) => console.warn(msg),
    error: (msg) => console.error(msg),
    debug: (msg) => console.debug(msg),
};
function setLogger(l) {
    exports.logger = l;
}
exports.setLogger = setLogger;
//# sourceMappingURL=logger.js.map