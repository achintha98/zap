import { Router } from "express";
import { signUpSchema, signInchema } from "../validationSchema";

const userRouter = Router();

userRouter.post("/user", (req, res, next) => {
    try {
        console.log( req.body)

        const validatedData = signUpSchema.parse(req.body);
        res.json({ message: "Signup successful", data: validatedData });
        } catch (error) {
        console.log(error)
        res.status(411).json({Message: "Invalid data"});
    }
})


export default userRouter;