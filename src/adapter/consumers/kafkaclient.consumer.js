require('dotenv').config();
const kafka = require("../../config/kafkaPlainSettings");
const Registry = require("../schema-registry/customSchemaRegistry");
const topicName = process.env.KAFKA_TOPIC_NAME;
const consumer = kafka.kafkaLocal.consumer({
    groupId: process.env.KAFKA_CONSUMER_GROUP_ID
});
const registryList = {}
const avroSchemaURL = process.env.KAFKA_SCHEMA_REGISTRY_URL

module.exports.enableKafkaConsumer = () => {
    enableKafkaConsumer().catch(error => {
        console.error('Failed to start consumer', error)
        consumer.disconnect().catch(error => {
            console.error('Failed to gracefully disconnect consumer', error)
        });
    })
};

async function enableKafkaConsumer() {
    await consumer.connect()

    await consumer.subscribe({
        topic: topicName,
        // compression: CompressionTypes.GZIP,
        fromBeginning: false
    })

    const registry = await getRegistry(topicName);

    return await consumer.run({
        eachMessage: async ({topic, partition, message}) => {
            const factRecord = await registry.decode(message.value)
            console.log("==========================Consumer Begins==========================");
            console.log('Kafka message Received', {
                topic,
                partition,
                key: message.key.toString(),
                value: factRecord
            });
            console.log("==========================Consumer Ends==========================");
        }
    });
};

function getRegistry(topic) {
    if (!registryList[topic]) {
        registryList[topic] = new Registry({
            url: avroSchemaURL,
        });
        console.info(`Current registry list: ${JSON.stringify(registryList)}`);
    }
    return registryList[topic];
}