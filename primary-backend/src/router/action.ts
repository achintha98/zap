import {Router} from "express";
import { authMiddleWare } from "../modules/middleware";
import {prisma} from "../db"
import { zapSchema } from "../validationSchema";
import { create } from "domain";

const actionRouter = Router();

actionRouter.post("/actionType", authMiddleWare, async (req, res, next) => {
    try {
        console.log( req.body)
        const newActionType = await prisma.availabeAction.create({
            data: {
                name: req.body.name
            }
        })
        res.json({ message: "Action type added successful", newActionType });
        } catch (error) {
        console.log(error)
        res.status(411).json({Message: "Invalid data"});
    }
})
