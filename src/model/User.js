"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.User = void 0;
var invalidParameterError_1 = require("../error/invalidParameterError");
var User = /** @class */ (function () {
    function User(id, name, nickname, email, password, role, description_band) {
        this.id = id;
        this.name = name;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.role = role;
        this.description_band = description_band;
    }
    User.prototype.getId = function () {
        return this.id;
    };
    User.prototype.getName = function () {
        return this.name;
    };
    User.prototype.getNickname = function () {
        return this.nickname;
    };
    User.prototype.getEmail = function () {
        return this.email;
    };
    User.prototype.getPassword = function () {
        return this.password;
    };
    User.prototype.getRole = function () {
        return this.role;
    };
    User.prototype.getDescription = function () {
        return this.description_band;
    };
    User.userRoleType = function (role) {
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
    };
    return User;
}());
exports.User = User;
var UserRole;
(function (UserRole) {
    UserRole["BANDA"] = "banda";
    UserRole["OUVINTE_PAGANTE"] = "pagante";
    UserRole["OUVINTE_NAO_PAGANTE"] = "nao_pagante";
    UserRole["ADMIN"] = "admin";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
