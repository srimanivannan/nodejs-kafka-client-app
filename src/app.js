const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const appHost = 'localhost'
const mainRoute = require('./routes/main.routes');
const {enableKafkaConsumer} = require("./adapter/consumers/kafkaclient.consumer");
require('dotenv').config();
const appPort = process.env.APP_PORT || 9000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(mainRoute);
app.listen(appPort, appHost, () => {
    console.log("application is listening at http://%s:%s", appHost, appPort)
});

enableKafkaConsumer();
