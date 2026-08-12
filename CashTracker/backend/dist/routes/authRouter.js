"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const AuthController_1 = require("../controllers/AuthController");
const validation_1 = require("../middleware/validation");
const limiter_1 = require("../config/limiter");
const router = (0, express_1.Router)();
router.use(limiter_1.limiter);
router.post('/create-count', (0, express_validator_1.body)('name')
    .notEmpty().withMessage('El nombre no puede ir vacio'), (0, express_validator_1.body)('password')
    .isLength({ min: 8 }).withMessage('La contraseña es muy corta, mínimo 8 caracteres'), (0, express_validator_1.body)('email')
    .isEmail().withMessage("Email no valido"), validation_1.handleInputError, AuthController_1.AuthController.creatAccount);
router.post('/confirm-account', (0, express_validator_1.body)('token')
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage("El token no es valido"), AuthController_1.AuthController.confirmAccount);
router.post('/login', (0, express_validator_1.body)('email')
    .isEmail().withMessage('Email no valido'), (0, express_validator_1.body)('password')
    .notEmpty().withMessage('La contraseña no es valida'), validation_1.handleInputError, AuthController_1.AuthController.login);
exports.default = router;
//# sourceMappingURL=authRouter.js.map