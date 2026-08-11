import {Router} from 'express'
import { body, param } from 'express-validator'
import { BudgetController } from '../controllers/BudgetController'
import { handleInputError } from '../middleware/validation'
import { validateBudgetExists, validateBudgetId, validateBudgetInput } from '../middleware/budget'
import { ExpensesController } from '../controllers/ExpensesController'
import Expense from '../models/Expense'
import { validateExpenseExists, validateExpenseId, validateExpenseInput } from '../middleware/expense'

const router = Router() 

/* Routes for Budget */

// asi se puede avitar poner en cada ruta que ocupe el id como parametro
router.param('budgetId', validateBudgetId)
router.param('budgetId', validateBudgetExists)

router.param('expenseId', validateExpenseId)
router.param('expenseId', validateExpenseExists)

router.get('/', BudgetController.getAll) 

router.post('/',
    validateBudgetInput,
    handleInputError,
    BudgetController.create
) 
  
router.get('/:budgetId', 
    BudgetController.getById
)

router.put('/:budgetId', 
    validateBudgetInput,
    handleInputError,
    BudgetController.updateById
) 

router.delete('/:budgetId', BudgetController.deleteById) 

/* Routes for Expenses */

router.post('/:budgetId/expenses', 
    validateExpenseInput,
    handleInputError,
    ExpensesController.create
)

router.get('/:budgetId/expenses/:expenseId', ExpensesController.getById)

router.put('/:budgetId/expenses/:expenseId', 
    validateExpenseInput,
    handleInputError,
    ExpensesController.updateById
)

router.delete('/:budgetId/expenses/:expenseId', ExpensesController.deleteById)

export default router