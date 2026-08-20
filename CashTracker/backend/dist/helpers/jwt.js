"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const generateJWT = (id) => {
    return (0, jsonwebtoken_1.sign)({ id }, "palabrasupersecreta", {
        expiresIn: "180d"
    });
};
exports.generateJWT = generateJWT;
//# sourceMappingURL=jwt.js.map