import { NextFunction, Router } from "express";
import { signUpSchema, signInchema } from "../validationSchema";
import { authMiddleWare, UserRequest } from "../modules/middleware";
import {prisma} from "../db"
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateKey } from "crypto";
import {generateSalt, hashPassword} from "../modules/hashing";

const userRouter = Router();

const SALT_ROUND = process.env.SALT_ROUND || "10";
const SECRET = process.env.SECRET;


userRouter.post("/user",  async (req, res) => {
    try {
        console.log( req.body);
        console.log(process.env.SALT_ROUND);
        console.log(typeof(SALT_ROUND));
        const generatedSalt = await generateSalt(SALT_ROUND);
        const validatedData = signUpSchema.parse(req.body);
        console.log(validatedData);
        const hashedPassword = await hashPassword(validatedData.password, generatedSalt)
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
        res.status(401).json({error: 'Invalid username or password'});
        return;
    }
    const isPassword = bcrypt.compare(password, user.Password);

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