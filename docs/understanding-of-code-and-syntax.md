### Understanding od code and syntax of this application

#### understanding on imports
```js
// The below importing means whole main.rotes file is getting imported as object.
// if you have any functions in the main.rotes file then, you will have to use object.methodname
// example, mainRoute.<<methodName>>
const mainRoute = require('./routes/main.routes');

// The below importing means Funtion type import meaning, you are importing funtion "enableKafkaConsumer" from kafka.consumer js file
const {enableKafkaConsumer} = require("./adapter/kafka.consumer");
```
