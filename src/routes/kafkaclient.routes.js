const express = require("express");
const router = express.Router();
const sendMessageToKafka = require('../controllers/kafkaclient.producer.controller');

router.post('/sendMessageToKafkaTopic', sendMessageToKafka.sendMessageToKafka);

module.exports = router