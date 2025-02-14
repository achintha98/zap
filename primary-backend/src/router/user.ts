import { Router } from "express";

const userRouter = Router();

userRouter.get("/user", (req, res) => {
    res.json({Message: "User Recived"});
})

export default userRouter;