"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Authenticator_1 = require("../Services/Authenticator");
const HashManager_1 = require("../Services/HashManager");
const IdGenerator_1 = require("../Services/IdGenerator");
const UserBusiness_1 = require("../Business/UserBusiness");
const UserDatabase_1 = require("../Data/UserDatabase");
class UserController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield UserController.UserBusiness.signup(req.body.name, req.body.nickname, req.body.email, req.body.password, req.body.role);
            }
            catch (err) {
                res.status(err.errorCode || 400).send({ message: err.message });
            }
        });
    }
}
exports.UserController = UserController;
UserController.UserBusiness = new UserBusiness_1.UserBusiness(new UserDatabase_1.UserDatabase(), new HashManager_1.HashManager(), new IdGenerator_1.IdGenerator(), new Authenticator_1.Authenticator());
//# sourceMappingURL=UserController.js.map