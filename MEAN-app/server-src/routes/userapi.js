const User = require('../modules/user');
const express = require('express');
const router =  express.Router()

const passport = require('passport');
const config = require ('../config/database.js');
const jwt = require('jsonwebtoken');

router.get('/user/profile', passport.authenticate('jwt',{session:false}), (req,res)=>{
    res.json({user: req.user})
})
router.get('/user/:username', (req,res)=>{

   User.findUser(req.params.username, (err, data)=>{
        if(err) res.send(err);
        else res.send(data);
   })
})
// Register request
router.post('/user/register', (req,res)=>{
    let newuser =  new User({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        username: req.body.username,
        password: req.body.password,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone
    })
    User.RegisterUser(newuser, (err, newuser)=>{
        if(err) res.json({err:true, msg: "failed to create user"})
        else res.json({err:false, msg: "user was created"})
    })
})
// Authentiticate request
router.post('/user/authenticate', (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    User.findUser(username, (err, user)=>
{       if(err) res.send(err);
        if(!user) 
        {
            res.json({success:false, msg: "user not found"});
        }
        else{
            User.comparePassword(password, user.password, (err,isMatch)=>{
                if(err) throw err;
        if(isMatch)
        {
            const token = jwt.sign({data: user}, config.secret ,{expiresIn: 604800});
            res.json({
                success: true,
                token: 'Bearer ' + token,
                user: {
                         id: user._id,
                         username: user.username,
                    }
            });
        }else
         res.json({success:false, msg: "Wrong password"});
     });
    }
        });  
});

module.exports = router;