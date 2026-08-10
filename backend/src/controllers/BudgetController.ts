import type {Request, Response} from 'express'
import Budget from '../models/Budget'

export class BudgetController {
    static getAll = async (req: Request, res: Response) => {
        console.log('Desde /api/budgets')
    }

    static create = async (req: Request, res: Response) => {
        try {
            //console.log(req.body)
            const budget = new Budget(req.body)

            await budget.save()
            // 201 -> creado correctamente
            res.status(201).json('Presupuesto creado correctamente')
            
        } catch(error){
            //console.log(error)
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static getById = async (req: Request, res: Response) => {
        console.log('Desde GET /api/budgets/id')
    }

    static updateById = async (req: Request, res: Response) => {
        console.log('Desde PUT /api/budgets/id')
    }

    static deleteById = async (req: Request, res: Response) => {
        console.log('Desde DELET /api/budgets/id')
    }
}