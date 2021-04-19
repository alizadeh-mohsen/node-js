const Joi = require('joi');
const express = require('express');
const router = express.Router();

const movies = [
    { id: 1, name: 'Batman' },
    { id: 2, name: 'Avengeres' },
    { id: 3, name: 'Peaky Blinders' },
    { id: 4, name: 'Game of Thrones' },
    { id: 5, name: 'The Lord of the rings ' },
    { id: 6, name: 'Die Hard' },
];


router.get('/', (req, res) => {
    res.send(movies);
});

router.get('/:id', (req, res) => {
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    if (!movie)
        return res.status(404).send('Movie not found');
    res.send(movie);
});

router.post('/', (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movie = {
        id: movies.length + 1,
        name: req.body.name
    };
    movies.push(movie);
    res.send(movies);
});

router.put('/:id', (req, res) => {

    const oldMovie = movies.find(c => c.id === parseInt(req.params.id));
    if (!oldMovie) return res.status(404).send('Movie not found');
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    oldMovie.name = req.body.name;
    res.send(movies);

});

router.delete('/:id', (req, res) => {
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Movie not found');
    const movieIndex = movies.indexOf(movie);
    movies.splice(movieIndex, 1);
    res.send(movies);
});



function validateMovie(movie) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(movie);

}

module.exports = router;