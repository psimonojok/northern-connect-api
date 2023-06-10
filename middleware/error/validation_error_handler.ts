import {NextFunction, Request, Response} from "express";
import {validationResult} from 'express-validator'

export default function validationErrorHandler(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const errorMessages: any = {}
        for (const [key, value] of Object.entries(errors.mapped())) {
            errorMessages[key] = {message: value.msg}
        }

        return res.status(400)
            .json({
                data: null,
                errors: errorMessages,
                status: false
            })
    }
    next()
}