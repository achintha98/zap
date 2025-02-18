import { NextFunction, Request, Response } from "express";
import express from "express"
import * as bcrypt from "bcrypt";



export function authMiddleWare(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        return res.status(403).json({ message: 'No token provided' });
    }
    const user = authHeader.split(" ")
    next();
}