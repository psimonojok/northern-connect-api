import {Router} from "express";
import {createUserAccount} from "../../../controllers/api/user/createUserAccount";

const userRouter = Router({mergeParams: true})

// @route   POST api/v1/users
// @desc    Register user
// @access  Public
userRouter.post('/', createUserAccount)

export default userRouter