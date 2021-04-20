
const mongoose = require('mongoose');
const movies = require('./routes/Movies');

const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json());
app.use('/api/movies', movies);


app.listen(3000, () => {
    console.log('listening to port 3000....');
});

app.get('/', (req, res) => {
    res.render('homepage');
});

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('connected to mongoDb'))
    .catch(err => console.error(err));

const movieSchema = new mongoose.Schema({
    name: String,
    rate: Number,
    staring: [String],
    date: { type: Date, default: Date.now },
    comingSoon: Boolean
});

async function createMovie() {

    const Movie = mongoose.model('movie', movieSchema);
    const movie = new Movie({
        name: 'Mr and Mrs Smit',
        rate: 6.5,
        staring: ['Brad Pitt', 'Angelina Julie'],
        commingSoon: false
    });

    const result = await movie.save();
    console.log(result);
}

createMovie();