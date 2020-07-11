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
const User_1 = require("../model/User");
const BaseDatabase_1 = require("./BaseDatabase");
class UserDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.table = "user_spotenu";
    }
    UserFromUserModel(UserModel) {
        return (UserModel &&
            new User_1.User(UserModel.id, UserModel.name, UserModel.nickname, UserModel.email, UserModel.password, UserModel.band_description, UserModel.role));
    }
    createUser(user) {
        const _super = Object.create(null, {
            getConnection: { get: () => super.getConnection }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.getConnection.call(this).raw(`
            INSERT INTO ${this.table} (id, name, email, password, band_description, role)
            VALUES (
                '${user.getId()}',
                '${user.getName()},
                '${user.getNickname()}'
                '${user.getEmail()},
                '${user.getPassword()},
                '${user.getDescription()},
                '${user.getRole()},
            )`);
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection().raw(`
            SELECT * from ${this.getUserByEmail} WHERE email ='${email}'
            
     `);
            return this.UserFromUserModel(result[0][0]);
        });
    }
}
exports.UserDatabase = UserDatabase;
//# sourceMappingURL=UserDatabase.js.map