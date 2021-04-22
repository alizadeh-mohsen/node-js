const mongoose = require('mongoose');
const joi = require('joi');

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {type: String, required: true},

}));


function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),

    });
    return schema.validate(genre);

}

module.exports.Genre = Genre;
module.exports.validate = validateGenre;