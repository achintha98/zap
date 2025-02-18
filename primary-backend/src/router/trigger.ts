import {Router} from "express";
import { authMiddleWare } from "../modules/middleware";
import {prisma} from "../db"

const triggerRouter = Router();

triggerRouter.post("/triggerType", authMiddleWare, async (req, res, next) => {
    try {
        console.log( req.body)
        const newActionType = await prisma.availabeTrigger.create({
            data: {
                name: req.body.name
            }
        })
        res.json({ message: "Trigger type added successful", newActionType });
        } catch (error) {
        console.log(error)
        res.status(411).json({Message: "Invalid data"});
    }
})
