import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

dotenv.config();

const SECRET = process.env.SECRET;

interface UserRequest extends Request {
    user: User;
}

export function authMiddleWare(req: UserRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        return res.status(403).json({ message: 'No token provided' });
    }
    const jwtString = authHeader.split(" ")
    if(jwtString) {
        return res.status(403).json({ message: 'No token provided' });
    }
    if (!SECRET) {
        throw new Error('SECRET_KEY is not defined in environment variables');
    }
    try {
        const decodedUser = jwt.verify(jwtString, SECRET);
        req.user = decodedUser as User;

    }
    catch(error) {
        return res.status(403).json({ error: "Forbidden: Invalid or expired token" });
    }

    next();
}