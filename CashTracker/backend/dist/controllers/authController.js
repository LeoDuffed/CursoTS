"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const User_1 = __importDefault(require("../models/User"));
const auth_1 = require("../helpers/auth");
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
}
exports.AuthController = AuthController;
//# sourceMappingURL=authController.js.map