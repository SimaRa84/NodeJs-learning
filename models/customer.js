const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema= new mongoose.Schema({
  
    name:{
        type: String,
        required: true,
        minlength:5,
        maxlength: 50
    } ,
    phone: {
        type: String,
        required: true,
        minlength:5,
        maxlength: 50 
    },
    isGold: {
        type: Boolean,
        default: false
    }
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer){
    
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(50),
        password: Joi.boolean()        
    });
    return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;

