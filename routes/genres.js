const auth = require('../middleware/auth')
const admin = require('../middleware/admin');
const {Genre, validate} = require('../models/genre'); //genre.Genre and genre.validate
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async(req,res) => {
    
    try{
        const genres = await Genre.find().sort('name');
        res.send( genres );
    }
    catch(ex){
        res.status(500).send('Something failed.'); 
    }
});

router.post('/', auth, async (req,res) => {

    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let genre = new Genre({
        name: req.body.name
    });
    genre = await genre.save(); //.push(genre);
    res.send(genre); 
});

router.put('/:id', async (req,res) => {

    const {  error }= validate(req.body);
    if( error ) return res.status(400).send(error.details[0].message);

    const genre= await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name}, {
        new: true
    });
    if(!genre) return res.status(404).send('The genre with the given ID was not found');

    res.send(genre);     
});

router.delete('/:id', [auth, admin], async (req,res) => {
    console.log('here');
    const genre = await Genre.findByIdAndRemove(req.params.id);    
    if(!genre) return res.status(404).send('The genre with the given ID was not found');
    res.send( genre );
});

router.get('/:id', async (req,res) => {

    const genre= await Genre.findById(req.params.id);
    if( !genre ) return res.status(404).send('The genre with the given ID was not found');
    res.send( genre );
});


module.exports = router;
// module.exports = mongoose.model('genre', genreSchema);