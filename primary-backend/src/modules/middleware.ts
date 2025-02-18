import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

dotenv.config();

const SECRET = process.env.SECRET;

export interface UserRequest extends Request {
    user: User;
}

export function authMiddleWare(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        res.status(403).json({ message: 'No token provided' });
        return;
    }
    const jwtString = authHeader.split(" ")
    if(jwtString) {
        res.status(403).json({ message: 'No token provided' });
        return;
    }
    if (!SECRET) {
        throw new Error('SECRET_KEY is not defined in environment variables');
    }
    try {
        const decodedUser = jwt.verify(jwtString, SECRET);
        next();
    }
    catch(error) {
        res.status(403).json({ error: "Forbidden: Invalid or expired token" });
        return;
    }
}