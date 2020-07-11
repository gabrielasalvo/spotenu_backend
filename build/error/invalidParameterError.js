"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseError_1 = require("./baseError/baseError");
class InvalidParameterError extends baseError_1.BaseError {
    constructor(message) {
        super(message, 422);
    }
}
exports.InvalidParameterError = InvalidParameterError;
//# sourceMappingURL=invalidParameterError.js.map