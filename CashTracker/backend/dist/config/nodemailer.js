"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transport = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = () => {
    const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env;
    const port = Number(EMAIL_PORT);
    if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS || Number.isNaN(port)) {
        throw new Error('Configura EMAIL_HOST, EMAIL_PORT, EMAIL_USER y EMAIL_PASS en el archivo .env');
    }
    return {
        host: EMAIL_HOST,
        port,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        }
    };
};
exports.transport = nodemailer_1.default.createTransport(config());
//# sourceMappingURL=nodemailer.js.map