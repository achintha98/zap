import { NextFunction, Router } from "express";
import { signUpSchema, signInchema } from "../validationSchema";
import { authMiddleWare } from "../modules/middleware";
import {prisma} from "../db"
import * as bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const userRouter = Router();

const SALT_ROUND = process.env.SALT_ROUND || "10";
const SECRET = process.env.SECRET;


userRouter.post("/user", authMiddleWare,  async (req, res) => {
    try {
        console.log( req.body)

        const validatedData = signUpSchema.parse(req.body);
        console.log(validatedData);
        const hashedPassword = await bcrypt.hash(validatedData.password, SALT_ROUND)
        const newUser = await prisma.user.create({
            data: {
                name: validatedData.username,
                email: validatedData.email,
                Password: hashedPassword
              },
            })
        res.json({ message: "Signup successful", newUser });
        } catch (error) {
        console.log(error)
        res.status(411).json({Message: "Invalid data"});
    }
})

userRouter.post("login", async (req, res,) => {
    const userName = req.body.username;
    const password = req.body.username;

    const user = await prisma.user.findFirst({
        where: {
            name: userName
        }
    })

    if(!user) {
        res.status(401).json({error: 'Invalid username or password'})
        return;
    }
    const isPassword = bcrypt.compare(user.Password, SALT_ROUND)

    if(!isPassword) {
         res.status(401).json({ error: 'Invalid username or password' });
         return;
    }

    if (!SECRET) {
        throw new Error('SECRET_KEY is not defined in environment variables');
    }
    
    const token = jwt.sign({ user}, SECRET);

    res.json({token});
})


export default userRouter;