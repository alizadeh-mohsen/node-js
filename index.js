
const mongoose = require('mongoose');
const movies = require('./routes/Movies');

const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json());
app.use('/api/movies', movies);

app.get('/', (req, res) => {
    res.render('homepage');
});
app.listen(3000, () => {
    console.log('listening to port 3000....');
});



mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to mongoDb'))
    .catch(err => console.error(err));

const movieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rate: Number,
    staring: [String],
    date: { type: Date, default: Date.now },
    comingSoon: Boolean,
    genre: [String]
});

const Movie = mongoose.model('movie', movieSchema);

async function createMovie() {

    const movie = new Movie({
        //   name: 'Mr and Mrs Smit',
        rate: 6.5,
        staring: ['Brad Pitt', 'Angelina Julie'],
        commingSoon: false
    });

    try {
        // movie.validate();
        const result = await movie.save();
        console.log(result);
    } catch (error) {
        console.log(error.message);
    }
}
createMovie();

async function getDocuments() {
    const movies = await Movie.find();
    console.log(movies);
};

async function getDocumentsOrderd() {
    const movies = await Movie
        // .find({ name: 'Spider Man' })
        .find()
        .or({ rate: 5 }, { name: 'mr' })
        .and({ date: Date.now })
        .find({ rate: { $gt: 6 } })
        .sort({ name: 1 })
        .limit(10)
        .select({ name: 1, rate: 1 });

    console.log(movies);
}

//getDocumentsOrderd();

