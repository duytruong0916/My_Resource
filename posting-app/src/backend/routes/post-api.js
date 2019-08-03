const Post = require('../modules/post');
const express = require('express');
const router = express.Router()
const checkAuth = require('../middlewares/check_auth.js')

router.get('/post', (req,res)=>{
  Post.find({}, (err, documents)=>{
    if(err) res.json({msg: "Failed to fetch post"})
    res.json({msg: "Successfully fetched", posts: documents})
  })
})
router.get('/post:id', (req,res)=>{
  Post.findById(req.params.id, (err, documents)=>{
    if(err) res.json({msg: "Failed to fetch post"})
    res.json({msg: "Successfully fetched", post: documents})
  })
})
router.post('/post', (req,res)=>{
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })
  post.save().then(result => {
    return res.json({
        success: true,
        message: "Post saved",
        postid: result._id
    });
})
})
router.delete('/post/delete:id', (req,res)=>{
  Post.deleteOne({_id:req.params.id}).then(result => {
    return res.json({
        success: true,
        message: "Post deleted"
    });
})
})
router.put('/post/update:id',(req,res)=>{
  const newpost = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({_id: req.params.id}, newpost).then(result=>{
    res.json({message: "Post updated successfully"})
  })
})
module.exports = router;
