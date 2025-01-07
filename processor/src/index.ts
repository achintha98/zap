import {Kafka} from "kafkajs" 
import { PrismaClient } from "@prisma/client";


const KAFKA_TOPIC = "zapier-events";
const client = new PrismaClient();

const kafka = new Kafka({
  clientId: 'outbox-processor',
  brokers: ['localhost:9092']
})

const producer = kafka.producer()

async function main() {
    await producer.connect()
    console.log("producer reach");
    
    while (true) {
        const pendingRows = await client.zapRunOutBox.findMany({
            take: 10
        })
    
        const kafka= await producer.send({
        topic: KAFKA_TOPIC,
        messages: pendingRows.map(r => ({
            value: r.zapRunId
        }))
    })

    console.log("kafka queue");
    console.log(kafka);
    console.log("--------------------------");

    await client.zapRunOutBox.deleteMany({
        where: {
          id: {
            in: pendingRows.map(row => row.id)
          },
        },
      })
    }
}

main();


