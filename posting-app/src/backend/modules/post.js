const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {type:String, required:true},
    content: { type:String, required:true},
    imagePath: { type:String, required:true},
    creator: {type: mongoose.Schema.Types.ObjectId,ref: 'User', required: true}

});
const Posts = module.exports =  mongoose.model('Posts',PostSchema);
