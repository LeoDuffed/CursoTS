"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBudgetInput = exports.validateBudgetExists = exports.validateBudgetId = void 0;
const express_validator_1 = require("express-validator");
const Budget_1 = __importDefault(require("../models/Budget"));
const validateBudgetId = async (req, res, next) => {
    await (0, express_validator_1.param)('budgetId')
        .isInt().withMessage('Id no valido')
        .custom(value => value > 0).withMessage('El id no es valido')
        .run(req);
    let errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.validateBudgetId = validateBudgetId;
const validateBudgetExists = async (req, res, next) => {
    try {
        const { budgetId } = req.params;
        const budget = await Budget_1.default.findByPk(Number(budgetId));
        if (!budget) {
            const error = new Error('Presupuesto no encontrado');
            return res.status(404).json({ error: error.message });
        }
        req.budget = budget;
        next();
    }
    catch (error) {
        //console.log(error)
        res.status(500).json({ error: 'Hubo un error' });
    }
};
exports.validateBudgetExists = validateBudgetExists;
const validateBudgetInput = async (req, res, next) => {
    await (0, express_validator_1.body)('name')
        .notEmpty().withMessage('El nombre del prosupuesto no puede ir vacio').run(req);
    await (0, express_validator_1.body)('amount')
        .notEmpty().withMessage('La cantidad del prosupuesto no puede ir vacia')
        .isNumeric().withMessage('Cantidad no válida')
        .custom(value => value > 0).withMessage('El presupuesto no es valido').run(req);
    next();
};
exports.validateBudgetInput = validateBudgetInput;
//# sourceMappingURL=budget.js.map