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
const invalidParameterError_1 = require("../error/invalidParameterError");
const User_1 = require("../model/User");
class UserBusiness {
    constructor(userDatabase, hashManager, idGenerator, authenticator) {
        this.userDatabase = userDatabase;
        this.hashManager = hashManager;
        this.idGenerator = idGenerator;
        this.authenticator = authenticator;
    }
    signup(name, nickname, email, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name || !email || !password) {
                throw new invalidParameterError_1.InvalidParameterError("MISSING INPUT");
            }
            if (email.indexOf("@") === -1 || email.indexOf(".com") === -1) {
                throw new invalidParameterError_1.InvalidParameterError("INVALID EMAIL");
            }
            if (password.length < 6) {
                throw new invalidParameterError_1.InvalidParameterError("YOUR PASSWORD NEED 6 OR MORE CHARACTERS");
            }
            const id = this.idGenerator.generate();
            const hashManager = yield this.hashManager.hash(password);
            const user = new User_1.User(id, name, nickname, email, password, User_1.User.userRoleType(role));
            const newUser = yield this.userDatabase.createUser(user);
            const token = this.authenticator.generate({ id, role });
        });
    }
}
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map