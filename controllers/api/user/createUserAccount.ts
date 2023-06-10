import {Handler, Response, Request} from "express";
import {body} from 'express-validator'
import validationErrorHandler from "../../../middleware/error/validation_error_handler";
import debug from "../../../utils/debug";

const handleUserValidation: (handler: Handler) => Handler[] = (handler: Handler) => [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Name is required')
        .isEmail().withMessage('email must be valid'),
    body('password').isLength({min: 6})
        .withMessage('Please enter a password with 6 or more characters'),
    validationErrorHandler,
    handler
]

export const createUserAccount = handleUserValidation((req: Request, res: Response) => {
        debug('Hitted The API End Point')
        res.status(200)
            .json({status: true})
    }
)