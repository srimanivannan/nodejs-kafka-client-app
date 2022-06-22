## kafka client consumer and producer

### Install
```sh
npm install
```

### Run and start the application
```sh
npm run start
```
### How to test the application
Start the application if not started using `npm run start` then
open the [kafka-client-test.http](./tests/kafaka-client-test.http) file in webstorm and run `Send POST request with kafka message as json body`.
<br>
For producer, you will see success response from http POST api call.
<br>
For consumer, look at the application console log.

### How to do SSL config setup?
Please see [here](./docs/how-to-export-certificates-from-jks.md)

### Understanding of code and syntax of this application
Please see [here](./docs/understanding-of-code-and-syntax.md)