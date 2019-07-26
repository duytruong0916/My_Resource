const halfmoon = require('../modules/halfmoon');
const express = require('express');
const router =  express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})
const upload = multer({storage: storage});

//API POST
router.post('/halfmoonInfo',upload.single('file'),(req,res,next)=>{
    let product = new halfmoon({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        productImage: req.file.name
    })
    product.save()
    .then(result=>{
        res.json({success: true, product: product});
    })
})

//Api GET
router.get('/halfmoonInfo', (req, res, next)=>{
    halfmoon.find({})
    .then(doc=>{
        console.log('From database', doc)
        res.sendFile(doc[0].productImage)
        })
    })
module.exports = router;