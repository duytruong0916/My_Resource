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

   User.findUser(req.params.email, (err, data)=>{
        if(err) res.send(err);
        else res.send(data);
   })
})
// Register request
router.post('/user/register', (req,res)=>{
    let newuser =  new User({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        password: req.body.password,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        birthday: req.body.birthday
    })
    User.findOne({email: newuser.email},(err,data)=>{
        if(err) res.send(err)
        else if(!data)
         {
            User.RegisterUser(newuser, (err, newuser)=>{
                if(err) res.json({err:true, msg: "Failed to create user"})
                else res.json({err:false, msg: "User was successfully created"})
            })  
        }
        else 
        {
            res.send({err:true, msg: "Email was used"})
        }
    })
})
// Authentiticate request
router.post('/user/authenticate', (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    User.findUser(email, (err, user)=>
{       if(err) res.send(err);
        if(!user) 
        {
            res.json({success:false, msg: "email not found"});
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
                         lastname: user.lastname,
                         firstname: user.firstname,
                    }
            });
        }else
         res.json({success:false, msg: "Wrong password"});
     });
    }
        });  
});

module.exports = router;