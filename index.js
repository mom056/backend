const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();


mongoose.connect(process.env.DB_KEY)
   
const Router=require('./routes/estate')

const app = express();

app.use(require('cors')());
app.use(express.json());



require('./routes')(app)
app.use('/v1',Router);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(process.env.PORT||4000, ()=> {
    console.log('server is running')
}) 