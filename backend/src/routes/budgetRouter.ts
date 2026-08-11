import {Router} from 'express'
import { body, param } from 'express-validator'
import { BudgetController } from '../controllers/BudgetController'
import { handleInputError } from '../middleware/validation'
import { validateBudgetExists, validateBudgetId, validateBudgetInput } from '../middleware/budget'

const router = Router() 

// asi se puede avitar poner en cada ruta que ocupe el id como parametro
//router.param('budgetId', validateBudgetId)
//router.param('budgetId', validateBudgetExists)

router.get('/', 
    BudgetController.getAll
) 

router.post('/',
    validateBudgetInput,
    handleInputError,
    BudgetController.create
) 
  
router.get('/:budgetId', 
    validateBudgetId,
    validateBudgetExists,
    BudgetController.getById
)

router.put('/:budgetId', 
    validateBudgetId,
    validateBudgetExists,
    validateBudgetInput,
    handleInputError,
    BudgetController.updateById
) 

router.delete('/:budgetId', 
    validateBudgetId,
    validateBudgetExists,
    BudgetController.deleteById
) 

export default router