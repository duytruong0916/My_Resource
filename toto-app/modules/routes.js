const express = require('express');
var router = express.Router();
var data = ['react', 'angular', 'vue', 'express'];
router.get('/todo', (req,res,next)=>{ 
    res.render('todo', {todos: data});
})


module.exports = router;