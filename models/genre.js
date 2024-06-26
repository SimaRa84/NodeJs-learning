const Joi = require('joi');

const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    } 
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre){
    // const schema = {
    //     name: Joi.string().min(3).required()
    // };
    // return Joi.validate(genre, schema);
    const schema = Joi.object({
        name:Joi.string().min(6).required(),
        // email:Joi.string().min(6).required().email(),
        // password:Joi.string().min(6).required()
    });
    return  schema.validate(genre);
    // res.send(Validation);
}

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validate = validateGenre;