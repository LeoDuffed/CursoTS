"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetController = void 0;
const Budget_1 = __importDefault(require("../models/Budget"));
const Expense_1 = __importDefault(require("../models/Expense"));
class BudgetController {
    static getAll = async (req, res) => {
        try {
            const budgets = await Budget_1.default.findAll({
                order: [
                    ['amount', 'DESC']
                ],
                // TODO: filtrar por el usuario autenticado
            });
            res.json(budgets);
        }
        catch (error) {
            //console.log(error)
            res.status(500).json({ error: 'Hubo un error' });
        }
    };
    static create = async (req, res) => {
        try {
            //console.log(req.body)
            const budget = new Budget_1.default(req.body);
            await budget.save();
            // 201 -> creado correctamente
            res.status(201).json('Presupuesto creado correctamente');
        }
        catch (error) {
            //console.log(error)
            res.status(500).json({ error: 'Hubo un error' });
        }
    };
    static getById = async (req, res) => {
        const budget = await Budget_1.default.findByPk(req.budget.id, {
            include: [Expense_1.default]
        });
        res.json(budget);
    };
    static updateById = async (req, res) => {
        await req.budget.update(req.body);
        res.json('Presupuesto actualizado correctamente');
    };
    static deleteById = async (req, res) => {
        await req.budget.destroy();
        res.json('Presupuesto eliminado correctamente');
    };
}
exports.BudgetController = BudgetController;
//# sourceMappingURL=BudgetController.js.map