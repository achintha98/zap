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
const KAFKA_TOPIC = "zapier-events";
const kafka = new kafkajs_1.Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092']
});
const consumer = kafka.consumer({ groupId: 'main-worker' });
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield consumer.connect();
        yield consumer.subscribe({ topic: KAFKA_TOPIC, fromBeginning: true });
        yield consumer.run({
            autoCommit: false,
            eachMessage: (_a) => __awaiter(this, [_a], void 0, function* ({ topic, partition, message }) {
                var _b;
                console.log({
                    partition,
                    offset: message.offset,
                    value: (_b = message.value) === null || _b === void 0 ? void 0 : _b.toString()
                });
                console.log("Starting 5-second delay...");
                yield new Promise((resolve) => setTimeout(resolve, 5000));
                console.log("Delay completed, now committing offset...");
                // Increment offset for committing
                const nextOffset = (parseInt(message.offset) + 1).toString();
                console.log(`Committing offset: ${nextOffset}`);
                yield consumer.commitOffsets([{ topic, partition, offset: nextOffset }]);
            }),
        });
    });
}
main();
