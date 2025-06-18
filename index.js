const express = require('express');
const {connectToMongo} = require('./Services/connectionWithMongo.js');
const router = require('./Services/webServices'); 

const app = express();
const PORT = 4000;

app.use(express.json());
app.use('/api', router); 

app.listen(PORT, () => {  
  connectToMongo();
  console.log(`the server is good ${PORT}`);
});
