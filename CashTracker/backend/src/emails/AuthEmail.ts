import { transport } from "../config/nodemailer"

type EmailType = {
    name: string,
    email: string,
    token: string,
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: EmailType) => {

        const email = await transport.sendMail({
            from: 'CashTrac <admin@cashtrac.com>',
            to: user.email,
            subject: 'CashTrac - Confirma tu cuenta',
            html: `
                <p>Hola: ${user.name}, has creado tu cuenta en CashTrac, ya esta casi lista</p>
                <p>Visita el siguiente enlace: </p>
                <a href="#"> Confirma cuenta </a>
                <p>e ingresa el código: <b>${user.token}</b></p>
            `
        })

        console.log('Mensaje enviado', email.messageId)

    }
}
