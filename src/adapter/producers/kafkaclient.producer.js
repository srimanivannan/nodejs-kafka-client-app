require('dotenv').config();
const kafka = require("../../config/kafkaPlainSettings");
const Registry = require("../schema-registry/customSchemaRegistry")

const topicName = process.env.KAFKA_TOPIC_NAME;
const registryList = {}
const avroSchemaURL = process.env.KAFKA_SCHEMA_REGISTRY_URL

async function sendMessage(payload) {
    console.log('sending event to topic: ', Date.now(), payload);
    const producer = kafka.kafkaLocal.producer();

    await producer.connect();
    const registry = getRegistry(topicName);
    const version = '2';
    await producer.send({
        topic: topicName,
        // compression: CompressionTypes.GZIP,
        messages: [
            {
                key: payload.key,
                value: await registry.encode(topicName, version || 'latest', JSON.parse(payload.value)),
            },
        ],
    }).then(result => {
        const recordMetadata = result.pop();
        console.log('Message is successfully delivered to topic:%s on a partition:%d with statusCode:%d', recordMetadata.topicName, recordMetadata.partition, recordMetadata.errorCode);
    });
}

function getRegistry(topic) {
    if (!registryList[topic]) {
        registryList[topic] = new Registry({
            url: avroSchemaURL,
        });
        console.info(`Current registry list: ${JSON.stringify(registryList)}`);
    }
    return registryList[topic];
}

module.exports = sendMessage;