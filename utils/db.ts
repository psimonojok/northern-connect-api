import {connect} from "mongoose";
import debug from "./debug";

const DATABASE_URL = process.env.MONGO_DATABASE_URL || ""

export const connectDatabase = async () => {
    try {
        const {connection} = await connect(DATABASE_URL)
        debug(`Mongo Database Connected: ${connection?.host}`)
        return connection
    } catch (e) {
        debug('Error Connecting to Database')
        process.exit(1)
    }
}