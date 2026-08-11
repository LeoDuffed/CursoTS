import type { Request, Response } from "express"
import User from "../models/User"
import { hashPassword } from "../helpers/auth"
import { generateToken } from "../helpers/token"

export class AuthController {

    static creatAccount = async (req: Request, res: Response) => {

        const { email, password } = req.body

        // Prevenir duplicados
        const userExists = await User.findOne({where: {email}})
        if(userExists){
            const error = new Error('El usuario ya existe')
            return res.status(409).json(error.message)
        }

        try{

            const user = new User(req.body)

            user.password = await hashPassword(password)
            user.token = generateToken()
            
            await user.save()
            res.json('Cuenta Creada Correctamente')

        } catch(error){ 
            // console.log(error)
            res.status(500).json({error: 'Hubo un error'})
        }
    }
}