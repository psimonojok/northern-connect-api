require('dotenv').config()
import express, {Request, Response} from 'express'
import debug from "./utils/debug";


const PORT = process.env.PORT || 3000
const app = express()

app.get('/', (req: Request, res: Response) => {
    res.send('API Running')
})

app.listen(PORT, () => {
    debug(`Server started on port ${PORT}`)
})