"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
const client_1 = require("@prisma/client");
const KAFKA_TOPIC = "zapier-events";
const client = new client_1.PrismaClient();
const kafka = new kafkajs_1.Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092']
});
const producer = kafka.producer();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield producer.connect();
        console.log("producer reach");
        while (true) {
            const pendingRows = yield client.zapRunOutBox.findMany({
                take: 10
            });
            const kafka = yield producer.send({
                topic: KAFKA_TOPIC,
                messages: pendingRows.map(r => ({
                    value: r.zapRunId
                }))
            });
            console.log("kafka queue");
            console.log(kafka);
            console.log("--------------------------");
            yield client.zapRunOutBox.deleteMany({
                where: {
                    id: {
                        in: pendingRows.map(row => row.id)
                    },
                },
            });
        }
    });
}
main();
