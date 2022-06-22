const {Kafka, CompressionTypes, CompressionCodecs} = require('kafkajs');
const LZ4 = require('kafkajs-lz4')
const fs = require('fs')
//const remoteBrokers = JSON.parse(process.env.KAFKA_BROKERS);
const remoteBrokers = ['kafka1-devtest1-aws-us-east-1.aws-use1.cloud.mani.com:9093', 'kafka2-devtest1-aws-us-east-1.aws-use1.cloud.mani.com:9093'];
const consumerClientID = 'domainspace-core';
CompressionCodecs[CompressionTypes.LZ4] = new LZ4().codec

const kafkaWithSSL = new Kafka({
    clientId: consumerClientID,
    brokers: remoteBrokers,
    ssl: {
        /* if rejectUnauthorized true then you need to enable ca: [certificate] which truststore certificate
            if rejectUnauthorized false then you don't need ca: [certificate] to be enabled
        */
        rejectUnauthorized: true,
        // export this ca certificate from trust store jks or p12 file
        ca: [fs.readFileSync('/Users/msrin471/soft/kafaka/kafakacerttrust.pem', 'utf-8')],
        // export key from keystore jks file or p12 file
        key: fs.readFileSync('/Users/msrin471/soft/kafaka/kafkakeystore.pem', 'utf-8'),
        // export certificate from keystore jks file or p12 file
        cert: fs.readFileSync('/Users/msrin471/soft/kafaka/kafakacert.pem', 'utf-8'),
        //when you export key from keystore jks file or p12 as a pem file, you will have option to provide password
        passphrase: '123456'
    },
});

module.exports = {kafkaWithSSL};
