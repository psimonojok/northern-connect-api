import {Handler, Response, Request} from "express";
import {body} from 'express-validator'
import validationErrorHandler from "../../../middleware/error/validation_error_handler";
import User, {IUser} from "../../../models/User";
import gravatar from "gravatar"
import bcrypt from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import {IJWTPayload} from "../../../utils/interface/IJWTPayload";

const handleUserValidation: (handler: Handler) => Handler[] = (handler: Handler) => [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Email is required')
        .isEmail().withMessage('email must be valid'),
    body('password').isLength({min: 6})
        .withMessage('Please enter a password with 6 or more characters'),
    validationErrorHandler,
    handler
]

export const createUserAccount = handleUserValidation(async (req: Request, res: Response) => {
        const {name, email, password} = req.body
        const existingUser = await User.findOne({email})

        if (existingUser) {
            return res.status(400).json({
                status: false,
                errors: {email: 'Email already used'},
                data: null
            })
        }

        const avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'}, true)
        const salt = await bcrypt.genSalt(10)
        const user = new User({name, email, avatar, password: await bcrypt.hash(password, salt)})
        await user.save()

        const payload: IJWTPayload = {
            id: user._id,
            name,
            email
        }

        const token = jsonwebtoken.sign(payload, process.env.JSON_WEB_TOKEN_SECRET || '', {expiresIn: 36000})
        // @ts-ignore
        user.password = undefined

        res.status(201)
            .json({
                status: true,
                errors: null,
                data: user,
                token
            })
    }
)