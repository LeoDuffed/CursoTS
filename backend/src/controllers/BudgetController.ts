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

    static getById = async (req: Request<{id: string}>, res: Response) => {
        try {

            const { id } = req.params
            const budget = await Budget.findByPk(Number(id))

            if(!budget){
                const error = new Error('Presupuesto no encontrado')
                return res.status(404).json({error: error.message})
            }

            res.json(budget)

        } catch(error){
            //console.log(error)
            res.status(500).json({error: 'Hubo un error'})
        }    
    }

    static updateById = async (req: Request<{id: string}>, res: Response) => {
        try {

            const { id } = req.params
            const budget = await Budget.findByPk(Number(id))

            if(!budget){
                const error = new Error('Presupuesto no encontrado')
                return res.status(404).json({error: error.message})
            }

            await budget.update(req.body)
            res.json('Presupuesto actualizado correctamente')

        } catch(error){
            //console.log(error)
            res.status(500).json({error: 'Hubo un error'})
        }  
    }

    static deleteById = async (req: Request<{id:string}>, res: Response) => {
        try{
            const {id } = req.params
            const budget = await Budget.findByPk(Number(id))

            if(!budget){
                const error = new Error('Presupuesto no encontrado')
                return res.status(404).json({error: error.message})
            }

            await budget.destroy()
            res.json('Presupuesto eliminado correctamente')
            
        } catch(error){
            //console.log(error)
            res.status(500).json({error: 'Hubo un error'})
        }
    }
}