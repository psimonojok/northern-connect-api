import { Router, Request, Response} from "express";

const webRouter = Router({})
webRouter.get('/', (req: Request, res: Response) => {
    res.send('Welcome To Northern Connect Web')
})

export default webRouter