import {Router} from "express";
import v1Router from "./api/v1";

const apiRouter = Router({ mergeParams: true})

apiRouter.use('/v1', v1Router)

export default apiRouter