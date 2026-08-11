"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensesController = void 0;
const Expense_1 = __importDefault(require("../models/Expense"));
class ExpensesController {
    static create = async (req, res) => {
        try {
            //console.log(req.body)
            const expense = new Expense_1.default(req.body);
            expense.budgetId = req.budget.id;
            await expense.save();
            // 201 -> creado correctamente
            res.status(201).json('Gasto agregado correctamente');
        }
        catch (error) {
            //console.log(error)
            res.status(500).json({ error: 'Hubo un error' });
        }
    };
    static getById = async (req, res) => {
        res.json(req.expense);
    };
    static updateById = async (req, res) => {
        req.expense.update(req.body);
        res.json('Se actualizó correctamente');
    };
    static deleteById = async (req, res) => {
        await req.expense.destroy();
        res.json('Gasto eliminado correctamente');
    };
}
exports.ExpensesController = ExpensesController;
//# sourceMappingURL=ExpensesController.js.map