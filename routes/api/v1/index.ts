import {Router} from "express";
import userRouter from "./user";

const v1Router = Router({mergeParams: true})

v1Router.use('/users', userRouter)

export default v1Router