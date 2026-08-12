"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BudgetController_1 = require("../controllers/BudgetController");
const validation_1 = require("../middleware/validation");
const budget_1 = require("../middleware/budget");
const ExpensesController_1 = require("../controllers/ExpensesController");
const expense_1 = require("../middleware/expense");
const router = (0, express_1.Router)();
/* Routes for Budget */
// asi se puede avitar poner en cada ruta que ocupe el id como parametro
router.param('budgetId', budget_1.validateBudgetId);
router.param('budgetId', budget_1.validateBudgetExists);
router.param('expenseId', expense_1.validateExpenseId);
router.param('expenseId', expense_1.validateExpenseExists);
router.get('/', BudgetController_1.BudgetController.getAll);
router.post('/', budget_1.validateBudgetInput, validation_1.handleInputError, BudgetController_1.BudgetController.create);
router.get('/:budgetId', BudgetController_1.BudgetController.getById);
router.put('/:budgetId', budget_1.validateBudgetInput, validation_1.handleInputError, BudgetController_1.BudgetController.updateById);
router.delete('/:budgetId', BudgetController_1.BudgetController.deleteById);
/* Routes for Expenses */
router.post('/:budgetId/expenses', expense_1.validateExpenseInput, validation_1.handleInputError, ExpensesController_1.ExpensesController.create);
router.get('/:budgetId/expenses/:expenseId', ExpensesController_1.ExpensesController.getById);
router.put('/:budgetId/expenses/:expenseId', expense_1.validateExpenseInput, validation_1.handleInputError, ExpensesController_1.ExpensesController.updateById);
router.delete('/:budgetId/expenses/:expenseId', ExpensesController_1.ExpensesController.deleteById);
exports.default = router;
//# sourceMappingURL=budgetRouter.js.map