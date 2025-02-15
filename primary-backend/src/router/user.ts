import { Router } from "express";
import { signUpSchema, signInchema } from "../validationSchema";
import { PrismaClient } from "@prisma/client";

const userRouter = Router();
const prisma = new PrismaClient();

userRouter.post("/user", async (req, res, next) => {
    try {
        console.log( req.body)

        const validatedData = signUpSchema.parse(req.body);
        console.log(validatedData);
        const newUser = await prisma.user.create({
            data: {
                name: validatedData.username,
                email: validatedData.email,
                Password: validatedData.password
              },
            })
        res.json({ message: "Signup successful", newUser });
        } catch (error) {
        console.log(error)
        res.status(411).json({Message: "Invalid data"});
    }
})

export default userRouter;