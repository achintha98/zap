import {Kafka} from "kafkajs" 
import { PrismaClient } from "@prisma/client";


const KAFKA_TOPIC = "zap-events";
const client = new PrismaClient();

const kafka = new Kafka({
  clientId: 'outbox-processor',
  brokers: ['localhost:9092']
})

const producer = kafka.producer()

async function main() {
    const pendingRows = await client.zapRunOutBox.findMany({
        take: 10
    })

    while (true) {
        await producer.connect()
        await producer.send({
        topic: KAFKA_TOPIC,
        messages: pendingRows.map(r => ({
            value: r.zapRunId
        }))
    })

    }
}

main();


