import {Router} from 'express'
import { body, param } from 'express-validator'
import { BudgetController } from '../controllers/BudgetController'
import { handleInputError } from '../middleware/validation'

const router = Router()

router.get('/', 
    BudgetController.getAll
) 

router.post('/',
    body('name')
        .notEmpty().withMessage('El nombre del prosupuesto no puede ir vacio'),
    body('amount')
        .notEmpty().withMessage('La cantidad del prosupuesto no puede ir vacia')
        .isNumeric().withMessage('Cantidad no válida')
        .custom(value => value > 0).withMessage('El presupuesto no es valido'),
    handleInputError,
    BudgetController.create
) 
  
router.get('/:id', 
    param('id').isInt().withMessage('Id no valido')
    .custom(value => value > 0).withMessage('El id no es valido'),
    handleInputError,
    BudgetController.getById
)

router.put('/:id', 
    param('id').isInt().withMessage('Id no valido')
        .custom(value => value > 0).withMessage('El id no es valido'),
    body('name')
        .notEmpty().withMessage('El nombre del prosupuesto no puede ir vacio'),
    body('amount')
        .notEmpty().withMessage('La cantidad del prosupuesto no puede ir vacia')
        .isNumeric().withMessage('Cantidad no válida')
        .custom(value => value > 0).withMessage('El presupuesto no es valido'),
    handleInputError,
    BudgetController.updateById
) 

router.delete('/:id', 
    param('id').isInt().withMessage('Is no valido')
        .custom(value => value > 0).withMessage('El id no es valido'),
    handleInputError,
    BudgetController.deleteById
) 

export default router