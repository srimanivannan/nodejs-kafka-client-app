const sendMessage = require("../adapter/producers/kafkaclient.producer");

module.exports.sendMessageToKafka = async (req, res) => {
    sendMessage(req.body)
        .then(() => {
            return res.status(201).send({
                status: 'success'
            })
        })
        .catch(error => {
            console.error("Error while sending message to kafka", error);
            return res.status(500).send({
                status: 'failed',
                reason: error
            })
        })
};
