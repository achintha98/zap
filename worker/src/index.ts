import {Kafka} from "kafkajs" 

const KAFKA_TOPIC = "zapier-events";

const kafka = new Kafka({
  clientId: 'outbox-processor',
  brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'main-worker' })

async function main() {
await consumer.connect()
await consumer.subscribe({ topic: KAFKA_TOPIC, fromBeginning: true })

await consumer.run({
  autoCommit: false,  
  eachMessage: async ({ topic, partition, message }) => {
    console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString()
    })
    await new Promise(r => setTimeout(r, 10000))
    await consumer.commitOffsets([{topic, partition, offset: message.offset}])
  },
})
}

main();