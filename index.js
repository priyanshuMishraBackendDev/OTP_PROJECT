const express = require('express');
const fs = require('fs');
const {dbConnectAndSync} = require("./Utils/db")
const app = express();
const port = 4000;
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectionString = 'mongodb+srv://root:hq4TbQ1NwYY3PRxF@priyanshupersonal.q9jelbo.mongodb.net/OTP_GENERATOR?retryWrites=true&w=majority';
const dbOptions = {
    useNewUrlParser: true,
  useUnifiedTopology: true,
//   useCreateIndex: true,
  };
dbConnectAndSync(connectionString, dbOptions).then((list)=>{
    require('./api')(app, io)

    server.listen(port, async () => {
        console.log(`Listening on port ${port}`)
        console.log("the collection in the dbs are : \n",list)
    })
    console.log("DB connection established")
})
