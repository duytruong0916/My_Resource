const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const halfmoonSchema = new Schema({
    name: {type:String, require: true},
    description: {type:String, require:true },
    price: {type:Number, require:true},
    productImage: {type:String, require:true},

})
const Halfmoon = module.exports = mongoose.model('Halfmoon',halfmoonSchema);
