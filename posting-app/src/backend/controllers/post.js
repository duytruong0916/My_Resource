const Post = require('../modules/post');

exports.GetPost  = (req,res)=>{
  Post.find({creator: req.userData.userid}, (err, documents)=>{
    if(err) res.json({msg: "Failed to fetch post"})
    res.json({msg: "Successfully fetched", posts: documents})
  })
}
exports.GetPostWithID = (req,res)=>{
  Post.findById(req.params.id, (err, documents)=>{
    if(err) res.json({msg: "Failed to fetch post"})
    res.json({msg: "Successfully fetched", post: documents})
  })
}

exports.AddPost = (req,res)=>{
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/uploads/' + req.file.filename,
    creator: req.userData.userid
  })
  post.save().then(result => {
    return res.json({
        success: true,
        message: "Post saved",
        post: {
          title: result.title,
          content: result.content,
          id: result._id,
          imagePath: result.imagePath
        }
    });
})
}
exports.DeletePost =  (req,res)=>{
  Post.deleteOne({_id:req.params.id, creator: req.userData.userid}).then(result => {
    return res.json({
        success: true,
        message: "Post deleted"
    });
})
}
exports.UpdatePost = (req,res)=>{
  let imagePath =  req.body.image;
  if(req.file){
     const url = req.protocol + '://' + req.get('host');
     imagePath= url + '/uploads/' + req.file.filename
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userid
  })
  Post.updateOne({_id: req.params.id, creator: req.userData.userid}, post).then(result=>{
    res.json({message: "Post updated successfully",
              updatedpost: result })
  })
}
