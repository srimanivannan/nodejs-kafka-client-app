const {Kafka} = require('kafkajs');
const clientAppId = process.env.KAFKA_CLIENT_ID
const localBrokers = JSON.parse(process.env.KAFKA_BROKERS);

const kafkaLocal = new Kafka({
    clientId: clientAppId,
    brokers: localBrokers
});

module.exports = {kafkaLocal};