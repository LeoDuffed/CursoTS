import { rateLimit } from 'express-rate-limit'

// limitar cuantas peticiones se hacen

export const limiter = rateLimit({
    windowMs: 60 * 1000, // un minuto
    limit: 5, // solo 5 req por min
    message: {"error": "Has alcanzado el límite de peticiones"},
})
