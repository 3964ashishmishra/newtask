require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');


app.use(cors());

app.use(express.json());

// connection with mongodb
require('./db/conn');

// Accesing model
const User = require('./model/user');

// accessing routing and apis
app.use(require('./routes/auth'));


app.listen(8000,()=>{
    console.log("listening to port no 8000");
})