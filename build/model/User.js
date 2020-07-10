"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const invalidParameterError_1 = require("../error/invalidParameterError");
class User {
    constructor(id, name, nickname, email, password, role, description_band) {
        this.id = id;
        this.name = name;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.role = role;
        this.description_band = description_band;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getNickname() {
        return this.nickname;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
    getRole() {
        return this.role;
    }
    getDescription() {
        return this.description_band;
    }
    static userRoleType(role) {
        switch (role) {
            case "banda":
                return UserRole.BANDA;
            case "pagante":
                return UserRole.OUVINTE_PAGANTE;
                break;
            case "nao_pagante":
                return UserRole.OUVINTE_NAO_PAGANTE;
                break;
            case "admin":
                return UserRole.ADMIN;
                break;
            default:
                throw new invalidParameterError_1.InvalidParameterError("Invalid user role");
        }
    }
}
exports.User = User;
var UserRole;
(function (UserRole) {
    UserRole["BANDA"] = "banda";
    UserRole["OUVINTE_PAGANTE"] = "pagante";
    UserRole["OUVINTE_NAO_PAGANTE"] = "nao_pagante";
    UserRole["ADMIN"] = "admin";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
//# sourceMappingURL=User.js.map