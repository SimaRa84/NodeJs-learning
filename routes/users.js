const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const mongoose = require ('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async(req,res) => {
    const users = await User.find().sort('name');
    res.send(users);
});

router.get('/me', auth, async (req,res) => {

    console.log('here');
    console.log(req.user._id);
    const user= await User.findById(req.user._id).select('-password');
    if( !user ) return res.status(404).send('The user with the given ID was not found');
    res.send(user);
});

router.post('/', async(req,res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email});
    if (user) return res.status(400).send('User already registered.');
     
     user = new User(_.pick(req.body,['name','email','password']));
        //{ email: req.body.email,
        // name: req.body.name,
        // password: req.body.password
    // });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    user = await user.save();    
    const token = user.generateAuthToken();
    res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']));
});

// router.put('/:id', async(req,res) => {
//     const { error } = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);
//     const user = User.findByIdAndUpdate(req.params.id,
//         { email: req.body.name,
//             passwrod: req.body.phone,
//             name: req.body.isGold
//         }, { new: true});

//     if(!user) return res.status(404).send('The user with the given ID was not found');
//     res.send(customer);     
// });

// router.delete('/:id', async(req,res) => {
//     const user = User.findByIdAndRemove(req.params.id);
//     if(!user) return res.status(404).send('The user with the given ID was not found');
//     res.send(customer);  
// });



module.exports = router;
