const mongoose = require('mongoose');
const validator = require('validator');
const { INVALID_URL_MESSAGE } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: INVALID_URL_MESSAGE,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: INVALID_URL_MESSAGE,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: INVALID_URL_MESSAGE,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
