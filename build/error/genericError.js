"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseError_1 = require("./baseError/baseError");
class GenericError extends baseError_1.BaseError {
    constructor(message) {
        super(message, 400);
    }
}
exports.GenericError = GenericError;
//# sourceMappingURL=genericError.js.map