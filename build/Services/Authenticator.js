"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Authenticator {
    constructor() {
        this.generate = (input) => {
            const newToken = jwt.sign({
                id: input.id,
                role: input.role,
            }, process.env.JWT_SECRET, {
                expiresIn: Authenticator.expiresIn,
            });
            return newToken;
        };
    }
    verify(token) {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const result = {
            id: payload.id,
            role: payload.role,
        };
        return result;
    }
}
exports.Authenticator = Authenticator;
Authenticator.expiresIn = 7200;
//# sourceMappingURL=Authenticator.js.map