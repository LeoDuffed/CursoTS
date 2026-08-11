import type { Request, Response, NextFunction} from "express"
import { body, validationResult, param } from "express-validator"
import Expense from "../models/Expense"

declare global {
    namespace Express {
        interface Request {
            expense?: Expense
        }
    }
}

export const validateExpenseInput = async (req: Request, res: Response, next: NextFunction) => {
    
    await body('name')
        .notEmpty().withMessage('El nombre del gasto no puede ir vacio').run(req)
        
   await body('amount')
        .notEmpty().withMessage('La cantidad del gasto no puede ir vacia')
        .isNumeric().withMessage('Cantidad no válida')
        .custom(value => value > 0).withMessage('El gasto no es valido').run(req)
    
    next()
}

export const validateExpenseId = async (req: Request, res: Response, next: NextFunction) => {
    
    await param('expenseId').isInt().withMessage('Id no valido')
        .custom(value => value > 0).withMessage('El id no es valido')
        .run(req)

    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    
    next()
}

export const validateExpenseExists = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { expenseId } = req.params
        const expense = await Expense.findByPk(Number(expenseId))

        if(!expense){
            const error = new Error('Gasto no encontrado')
            return res.status(404).json({error: error.message})
        }

        req.expense = expense

        next()
    } catch(error){
        //console.log(error)
        res.status(500).json({error: 'Hubo un error'})
    }  
}  