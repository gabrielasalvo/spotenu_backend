"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseError_1 = require("./baseError/baseError");
class Unauthorized extends baseError_1.BaseError {
    constructor(message) {
        super(message, 401);
    }
}
exports.Unauthorized = Unauthorized;
//# sourceMappingURL=Unauthorized.js.map