require('dotenv').config();
const express = require('express');
const imageRout = require('./Route/imageRout.js');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());
require('./Mongo.js');
require('dotenv').config();
const path=require("path");

app.use('/', imageRout);
app.use(express.static(path.join(__dirname,'../BackEnd')));


app.listen(process.env.PORT, () => {
    console.log(`Listening port https://localhost:${process.env.PORT}`);
});