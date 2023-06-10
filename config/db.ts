import {connect} from "mongoose";
import debug from "../utils/debug";

const DATABASE_URL = process.env.MONGO_DATABASE_URL || ""

export const connectDatabase = async () => {
    try {
        const {connection} = await connect(DATABASE_URL)
        debug(`Mongo Database Connected: ${connection?.host}`)
    } catch (e) {
        debug('Error Connecting to Database')
    }
}