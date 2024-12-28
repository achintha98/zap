import express from "express"
import { PrismaClient } from "@prisma/client";


const app = express();
const client = new PrismaClient(); 

app.post("hooks/zap/:userId/:zapId", (req, res) => {
    const userId = req.params.userId;
    const password = req.params.zapId

    await client.zapRun.create({
            data: {
                    
            }
    })

})