"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const authController_1 = require("../controllers/authController");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
router.post('/create-count', (0, express_validator_1.body)('name')
    .notEmpty().withMessage('El nombre no puede ir vacio'), (0, express_validator_1.body)('password')
    .isLength({ min: 8 }).withMessage('La contraseña es muy corta, mínimo 8 caracteres'), (0, express_validator_1.body)('email')
    .isEmail().withMessage("Email no valido"), validation_1.handleInputError, authController_1.AuthController.creatAccount);
exports.default = router;
//# sourceMappingURL=authRouter.js.map