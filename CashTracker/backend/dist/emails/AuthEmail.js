"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthEmail = void 0;
const nodemailer_1 = require("../config/nodemailer");
class AuthEmail {
    static sendConfirmationEmail = async (user) => {
        const email = await nodemailer_1.transport.sendMail({
            from: 'CashTrac <admin@cashtrac.com>',
            to: user.email,
            subject: 'CashTrac - Confirma tu cuenta',
            html: `
                <p>Hola: ${user.name}, has creado tu cuenta en CashTrac, ya esta casi lista</p>
                <p>Visita el siguiente enlace: </p>
                <a href="#"> Confirma cuenta </a>
                <p>e ingresa el código: <b>${user.token}</b></p>
            `
        });
        console.log('Mensaje enviado', email.messageId);
    };
}
exports.AuthEmail = AuthEmail;
//# sourceMappingURL=AuthEmail.js.map