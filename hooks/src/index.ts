import express from "express"
import { PrismaClient } from "@prisma/client";


const app = express();
const client = new PrismaClient();
app.use(express.json()); 

app.post("/hooks/zap/:userId/:zapId", (req, res) => {
  console.log("reached 1")

    const userId = req.params.userId;
    const zapId = req.params.zapId
    console.log("reached 4")

    const body = req.body;
    console.log("reached 2")


    client.$transaction(async (tx) => {
        const run = await tx.zapRun.create({
          data: {
            zapId: zapId,
            metaData: body
          }})

          console.log(run)

        await tx.zapRunOutBox.create({
          data: {
            zapRunId: run.id 
          }})
        })

        res.json({
            Message: "Success"
        })
})

app.listen(3000);