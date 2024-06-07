const router=require('express').Router()
const Post = require('../models/post')


router.post('/',async(req, res) => {
    const{title,desc,img}=req.body;
    const post=new Post({title,desc,img}) 
    const createdPost=await post.save();
    if (createdPost) res.status(201).json(createdPost);
})


router.get('/',async(req, res) => {
    const posts = await Post.find()
    if(posts) res.status(200).json(posts);
})


router.patch('/:id', async(req,res)=>{
    const id = req.params.id;
    const {title,desc,img} = req.body
    const updatedPost = await Post.findByIdAndUpdate({_id:id},{title,desc,img},{new:true});
    if(updatedPost)res.json(updatedPost);
})

router.delete('/:id',async(req,res)=>{
    const  id = req.params.id;
    const deletedPost = await Post.deleteOne({_id:id});
    if(deletedPost)res.json(deletedPost);
}) 

module.exports=router ;