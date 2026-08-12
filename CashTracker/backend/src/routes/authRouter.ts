import { Router } from "express";
import { body } from "express-validator";
import { AuthController } from "../controllers/AuthController";
import { handleInputError } from "../middleware/validation";
import { limiter } from "../config/limiter";

const router = Router()

router.use(limiter)

router.post('/create-count', 
    body('name')
        .notEmpty().withMessage('El nombre no puede ir vacio'),
    body('password')
        .isLength({min: 8}).withMessage('La contraseña es muy corta, mínimo 8 caracteres'),
    body('email')
        .isEmail().withMessage("Email no valido"),
    handleInputError,
    AuthController.creatAccount
)

router.post('/confirm-account',
    body('token')
        .notEmpty()
        .isLength({min: 6, max: 6})
        .withMessage("El token no es valido"),
    AuthController.confirmAccount
)

router.post('/login',
    body('email')
        .isEmail().withMessage('Email no valido'),
    body('password')
        .notEmpty().withMessage('La contraseña no es valida'),
    handleInputError,
    AuthController.login
)

export default router