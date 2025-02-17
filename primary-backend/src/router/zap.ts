import {Router} from "express";
import { authMiddleWare } from "../middleware";
import {prisma} from "../db"
import { zapSchema } from "../validationSchema";

const zapRouter = Router();

zapRouter.post("/zap", async (req, res, next) => {
    try {
        console.log( req.body)

        const validatedData = zapSchema.parse(req.body);
        console.log(validatedData);
        const zap = await prisma.zap.create({ 
            data: {
                trigger: {
                    create: {
                        triggerId: req.body.zap.trigger.triggerId
                    }
                },    
                action: {
                    create: {
                        actionId: req.body.zap.action.actionId
                    }   
                }
              },
            })
        res.json({ message: "Signup successful", zap });
        } catch (error) {
        console.log(error)
        res.status(411).json({Message: "Invalid data"});
    }
})

export default zapRouter;