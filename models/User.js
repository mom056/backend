const mongoose= require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min:5,
        max:25,
    },
    phone:{
        type: String,
        required: true,
        min:5,
        max:15,
       
         
    },
    password:{
        type : String,
        required: true,
        min:5,
        max:200,
    } 
    
});  

 


module.exports= User = mongoose.model('User',userSchema);