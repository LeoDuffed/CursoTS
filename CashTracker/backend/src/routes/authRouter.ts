import { Router } from "express";
import { body } from "express-validator";
import { AuthController } from "../controllers/authController";
import { handleInputError } from "../middleware/validation";

const router = Router()

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

export default router