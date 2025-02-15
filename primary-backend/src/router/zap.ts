import {Router} from "express";
import { authMiddleWare } from "../middleware";
import {prisma} from "../db"
import { zapSchema } from "../validationSchema";
import { create } from "domain";

const zapRouter = Router();

zapRouter.post("/zap", authMiddleWare, async (req, res, next) => {
    try {
        console.log( req.body)

        const validatedData = zapSchema.parse(req.body);
        console.log(validatedData);
        const newUser = await prisma.zap.create({
            data: {
                trigger: {
                    create: {
                        type: {
                            create: {
                                name: req.body.zap.trigger.type.name

                            }
                        }
                    }
                },
                action: {
                    create: [
                          {
                            actionId: "existing-available-action-id",
                            type: { connect: { id: "existing-available-action-id" } }
                          }
                        ]
                }
              },
            })
        res.json({ message: "Signup successful", newUser });
        } catch (error) {
        console.log(error)
        res.status(411).json({Message: "Invalid data"});
    }
})
