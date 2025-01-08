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
    console.log("Starting 5-second delay...");
      
    await new Promise((resolve) => setTimeout(resolve, 5000));
    
    console.log("Delay completed, now committing offset...");

    // Increment offset for committing
    const nextOffset = (parseInt(message.offset) + 1).toString();
    console.log(`Committing offset: ${nextOffset}`);
    
    await consumer.commitOffsets([{ topic, partition, offset: nextOffset }]);
},
})
}

main();