"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateExpenseExists = exports.validateExpenseId = exports.validateExpenseInput = void 0;
const express_validator_1 = require("express-validator");
const Expense_1 = __importDefault(require("../models/Expense"));
const validateExpenseInput = async (req, res, next) => {
    await (0, express_validator_1.body)('name')
        .notEmpty().withMessage('El nombre del gasto no puede ir vacio').run(req);
    await (0, express_validator_1.body)('amount')
        .notEmpty().withMessage('La cantidad del gasto no puede ir vacia')
        .isNumeric().withMessage('Cantidad no válida')
        .custom(value => value > 0).withMessage('El gasto no es valido').run(req);
    next();
};
exports.validateExpenseInput = validateExpenseInput;
const validateExpenseId = async (req, res, next) => {
    await (0, express_validator_1.param)('expenseId').isInt().withMessage('Id no valido')
        .custom(value => value > 0).withMessage('El id no es valido')
        .run(req);
    let errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.validateExpenseId = validateExpenseId;
const validateExpenseExists = async (req, res, next) => {
    try {
        const { expenseId } = req.params;
        const expense = await Expense_1.default.findByPk(Number(expenseId));
        if (!expense) {
            const error = new Error('Gasto no encontrado');
            return res.status(404).json({ error: error.message });
        }
        req.expense = expense;
        next();
    }
    catch (error) {
        //console.log(error)
        res.status(500).json({ error: 'Hubo un error' });
    }
};
exports.validateExpenseExists = validateExpenseExists;
//# sourceMappingURL=expense.js.map