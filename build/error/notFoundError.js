"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseError_1 = require("./baseError/baseError");
class NotFoundError extends baseError_1.BaseError {
    constructor(message) {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=notFoundError.js.map