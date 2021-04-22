
const mongoose = require('mongoose');
const movies = require('./routes/movies');
const genres = require('./routes/genres')
const customers = require('./routes/customers');

const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json());
app.use('/api/movies', movies);
app.use('/api/genres/', genres);
app.use('/api/customers/', customers);

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to mongoDb'))
    .catch(err => console.error(err));

app.get('/', (req, res) => {
    res.render('homepage');
});
app.listen(3000, () => {
    console.log('listening to port 3000....');
});


