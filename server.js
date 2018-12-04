var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("connected to mongodb"))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send("Server says HI wassup hows goin");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
