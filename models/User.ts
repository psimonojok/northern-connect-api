import {Schema, model} from "mongoose";

export interface IUser {
    name: string
    email: string
    password: string
    avatar: string
    date: Date
}

const userScheme = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

export default model<IUser>('User', userScheme)