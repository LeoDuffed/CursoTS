import type {Request, Response} from 'express'
import Budget from '../models/Budget'

export class BudgetController {

    static getAll = async (req: Request, res: Response) => {
        try{
            const budgets = await Budget.findAll({
                order: [
                    ['amount', 'DESC']
                ],
                // TODO: filtrar por el usuario autenticado
            })
            res.json(budgets)

        } catch (error) {
            //console.log(error)
            res.status(500).json({error: 'Hubo un error'})
        }
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
        res.json(req.budget)
    }

    static updateById = async (req: Request<{id: string}>, res: Response) => {
        await req.budget.update(req.body)
        res.json('Presupuesto actualizado correctamente')
    }

    static deleteById = async (req: Request<{id:string}>, res: Response) => {
        await req.budget.destroy()
        res.json('Presupuesto eliminado correctamente')
    }
}