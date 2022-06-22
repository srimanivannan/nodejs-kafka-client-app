## kafka client consumer and producer

### Some nodejs understanding
#### understanding on imports
```js
// The below importing means whole main.rotes file is getting imported as object.
// if you have any functions in the main.rotes file then, you will have to use object.methodname
// example, mainRoute.<<methodName>>
const mainRoute = require('./routes/main.routes');

// The below importing means Funtion type import meaning, you are importing funtion "enableKafkaConsumer" from kafka.consumer js file
const {enableKafkaConsumer} = require("./adapter/kafka.consumer");
```

### Install
```sh
npm install
```

### Run and start the application
```sh
npm run start
```
### How to test the application
Start the application if no
```sh
npm run start
```
open the [kafka-client-test.http](./tests/kafaka-client-test.http) file in webstorm and run it.
<br>
For producer, you will see success response from http POST api call.
<br>
For consumer, look at the application console log.

### How to do SSL config setup?
Please see [here](./docs/how-to-export-certificates-from-jks.md)