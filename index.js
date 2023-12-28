const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { pollRouter } = require('./routes/polls.routes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: '8080',
  user: 'bhairav',
  password: 'Bhairav@123',
  database: 'Bhairav@123',
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
  } else {
    console.log('Connected to MySQL');
  }
});

app.use("/polls",pollRouter)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
