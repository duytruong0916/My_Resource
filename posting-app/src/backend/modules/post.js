const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {type:String, required:true},
    content: { type:String, required:true},

});
const Posts = module.exports =  mongoose.model('Posts',PostSchema);
