import {Router} from 'express'
import { body } from 'express-validator'
import { BudgetController } from '../controllers/BudgetController'
import { handleInputError } from '../middleware/validation'

const router = Router()

router.get('/', BudgetController.getAll) 

router.post(
    '/',
    body('name')
        .notEmpty().withMessage('El nombre del prosupuesto no puede ir vacio'),
    body('amount')
        .notEmpty().withMessage('La cantidad del prosupuesto no puede ir vacia')
        .isNumeric().withMessage('Cantidad no válida')
        .custom(value => value > 0).withMessage('El presupuesto no es valido'),
    handleInputError,
    BudgetController.create
) 
  
router.get('/:id', BudgetController.getById) 
router.put('/:id', BudgetController.updateById) 
router.delete('/:id', BudgetController.deleteById) 

export default router