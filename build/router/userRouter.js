"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../Controller/UserController");
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/signup", new UserController_1.UserController().signup);
//# sourceMappingURL=userRouter.js.map