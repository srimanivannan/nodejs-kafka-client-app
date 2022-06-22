require('dotenv').config();
const request = require('supertest');
const appPort = process.env.APP_PORT || 9000;
const app = `http://localhost:${appPort}`;

describe('POST /sendMessageToKafkaTopic', () => {
    it('responds with json', done => {
        request(app)
            .post('/sendMessageToKafkaTopic')
            .set('Accept', 'application/json')
            .send({
                "key": "kafkakey",
                "value": "{\"factId\":\"1\",\"factType\":\"animal\",\"factDescription\":\"octopuses have 8 arms\"}"
            })
            .expect('Content-Type', /json/)
            // you can also change the response body
            // .expect((res) => {
            //     res.body.status = 'changed';
            // })
            .expect(201, {
                status: 'success'
            })
            .end((err, response) => {
                if (err) return done(err);
                console.log(response.body.status);
                return done();
            });
    });
});