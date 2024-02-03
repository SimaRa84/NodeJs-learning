const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');
const genres = require('./routes/genres');
const custmoers = require('./routes/customers');
const movies = require('./routes/movies');
// const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');

const app = express();  

if (!config.has('jwtPrivateKey')){
    console.error('Fatal Error: jwtPrivateKey is not defined');
    process.exit(1);
} 
mongoose.connect('mongodb://localhost/vidly')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error ('Could not connect to MongoDB...', err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', custmoers);
app.use('/api/movies', movies);
// app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);


const port =  3000;
app.listen(port,() => console.log(`Listening on port ${port}...`));


