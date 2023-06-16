import jsonwebtoken from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";
import {IRequest} from "../../utils/interface/IRequest";
import {IJWTPayload} from "../../utils/interface/IJWTPayload";

export const auth = (req: IRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401)
            .json({
                status: false,
                errors: {
                    token: 'No token, authorization denied'
                }
            })
    }

    try {
        const decoded = jsonwebtoken.verify(token, process.env.JSON_WEB_TOKEN_SECRET as string)
        console.log(decoded)
        req.user = decoded as IJWTPayload
        next()
    } catch (e) {
        res.status(401)
            .json({
                status: false,
                errors: {
                    token: 'Token is not valid'
                }
            })
    }
}