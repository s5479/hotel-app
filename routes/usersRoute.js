const express = require("express");

const router = express.Router();
const User = require('../models/user')

router.post("/register", async(req, res) => {
    const newuser = new User({name : req.body[0], email : req.body[1], password : req.body[2]});
    // console.log(newuser)
    try {
        const user = await newuser.save();
        res.send("user registered successfully")
    } catch (error) {
        // console.log(error)
        return res.status(400).json( {message :"Registration failed"})
    }

})

router.post("/login", async(req, res) => {
    //   console.log(req.body)
    const email = req.body[0];
    const password = req.body[1];

    try {
        const user =await User.findOne({email : email, password : password})
        // console.log(user)
        if(user){
            const temp = {
                name : user.name,
                email : user.email,
                isAdmin : user.isAdmin,
                _id : user._id
              
            }
            res.send(temp)
        }else{
            
            return res.status(400).json({ message :"Login failed"})
        }
    } catch (error) {
        // console.log(error)
        return res.status(400).json({ error})
    }

})
module.exports = router
