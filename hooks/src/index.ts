import express from "express"
import { PrismaClient } from "@prisma/client";


const app = express();
const client = new PrismaClient(); 

app.post("hooks/zap/:userId/:zapId", (req, res) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId

    client.$transaction(async (tx) => {
        const run = await tx.zapRun.create({
          data: {
            zapId: zapId 
          }})

        await tx.zapRunOutBox.create({
          data: {
            zapRunId: run.zapId 
          }})
        })
})