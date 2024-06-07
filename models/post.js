const mongoose =require("mongoose");
// const { post } = require("../routes/post");




const postSchema = new mongoose.Schema({
    title:{
        type: 'string',
        required: true
    },
    desc:{
        type: 'string',
        
    },
    img:{
        type: 'string',
       
    }
},{ timestamps: true })







module.exports=mongoose.model('post',postSchema)