const express = require('express');
const bodyParser = require('body-parser');
const { connection } = require('./config/db');
const { pollRouter } = require('./routes/polls.routes');
require("dotenv").config()
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.json())

// app.use("/",(req,res)=>{
//   res.send({"msg":"this is poll application"})
// })
app.use("polls",pollRouter)


// Start the server
app.listen(PORT, async() => {
  try {
    await connection
    console.log("connected to DB")
  } catch (error) {
    console.log({msg:`error while connected db ${error.message}`})
  }
  console.log(`Server is running on http://localhost:${PORT}`);
});
