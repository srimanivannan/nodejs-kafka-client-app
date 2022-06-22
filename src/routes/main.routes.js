const express = require("express");
const router = express.Router();

const kafkaClientRoute = require('./kafkaclient.routes');
router.use(kafkaClientRoute);

module.exports = router
