### Understanding of code and syntax of this application

#### Understanding different types of nodejs imports like commonjs import and ES6+ style imports
```js
// The below importing means whole main.routes file is getting imported as object.
// if you have any functions in the main.routes file then, you will have to use object.methodname
// example, mainRoute.<<methodName>>
const mainRoute = require('./routes/main.routes');

// The below importing means Funtion type import meaning, you are importing funtion "enableKafkaConsumer" from kafka.consumer js file
const {enableKafkaConsumer} = require("./adapter/kafka.consumer");
```
