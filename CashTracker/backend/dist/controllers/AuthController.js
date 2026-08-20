"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const User_1 = __importDefault(require("../models/User"));
const auth_1 = require("../helpers/auth");
const jwt_1 = require("../helpers/jwt");
const token_1 = require("../helpers/token");
const AuthEmail_1 = require("../emails/AuthEmail");
class AuthController {
    static creatAccount = async (req, res) => {
        const { email, password } = req.body;
        // Prevenir duplicados
        const userExists = await User_1.default.findOne({ where: { email } });
        if (userExists) {
            const error = new Error('El usuario ya existe');
            return res.status(409).json(error.message);
        }
        try {
            const user = new User_1.default(req.body);
            user.password = await (0, auth_1.hashPassword)(password);
            user.token = (0, token_1.generateToken)();
            await user.save();
            await AuthEmail_1.AuthEmail.sendConfirmationEmail({
                name: user.name,
                email: user.email,
                token: user.token,
            });
            res.json('Cuenta Creada Correctamente');
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Hubo un error' });
        }
    };
    static confirmAccount = async (req, res) => {
        const { token } = req.body;
        const user = await User_1.default.findOne({ where: { token } });
        if (!user) {
            const error = new Error('Token no válido');
            return res.status(401).json({ error: error.message });
        }
        user.confirm = true;
        user.token = null; // token de un solo uso
        await user.save();
        res.json(user);
        res.json('Cuenta confirmada correctamente');
    };
    static login = async (req, res) => {
        const { email, password } = req.body;
        // Revisar que el usuario exista
        const user = await User_1.default.findOne({ where: { email } });
        if (!user) {
            const error = new Error('Usuario no encontrado');
            return res.status(404).json({ error: error.message });
        }
        if (!user.confirm) {
            const error = new Error('La cuenta no ha sido confirmada');
            return res.status(403).json({ error: error.message });
        }
        const isPasswordCorrect = await (0, auth_1.checkPassword)(password, user.password);
        if (!isPasswordCorrect) {
            const error = new Error('Contraseña incorrecta');
            return res.status(401).json({ error: error.message });
        }
        (0, jwt_1.generateJWT)(user.id);
        res.json(isPasswordCorrect);
    };
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map