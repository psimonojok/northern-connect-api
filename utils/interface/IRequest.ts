import {Request} from "express";
import {IJWTPayload} from "./IJWTPayload";

export interface IRequest extends Request {
    user: IJWTPayload | undefined
}