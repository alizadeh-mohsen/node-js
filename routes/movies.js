const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



const Movie = mongoose.model('Movie', new mongoose.Schema({
    name: { type: String, required: true },
    rate: Number,
    staring: [String],
    date: { type: Date, default: Date.now },
    comingSoon: { type: Boolean, default: false }
}));

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

router.get('/:id', async (req, res) => {

    const movie = await Movie.findById(req.params.id);
    if (!movie)
        return res.status(404).send('Movie not found');
    res.send(movie);
});

router.post('/', async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {

        let movie = new Movie({
            name: req.body.name,
            rate: req.body.rate,
            staring: req.body.staring,
            date: req.body.adte,
            comingSoon: req.body.comingSoon
        });

        movie = await movie.save();
        res.send(result);

    } catch (error) {
        res.status(404).send(error.message);
    }


});

router.put('/:id', async (req, res) => {

    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let oldMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        { new: true }
    );

    if (!oldMovie) return res.status(404).send('Movie not found');

    res.send(oldMovie);

});

router.delete('/:id', async (req, res) => {
    const movie = await movies.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(404).send('Movie not found');

    res.send(movie);
});

function validateMovie(movie) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        staring: Joi.required(),

    });
    return schema.validate(movie);

}

module.exports = router;