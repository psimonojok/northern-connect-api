import webRouter from "./routes/web";

require('dotenv').config()
import express, {NextFunction, Request, Response} from 'express'
import morgan from 'morgan'

import debug from "./utils/debug";
import {connectDatabase} from "./utils/db";
import apiRouter from "./routes";


const PORT = process.env.PORT || 3000
const app = express()
connectDatabase().then()


app.use(morgan('dev'))
app.use(express.json())

app.use('/', webRouter)
app.use('/api', apiRouter)
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    debug(error)
})

app.listen(PORT, () => {
    debug(`Server started on port ${PORT}`)
})