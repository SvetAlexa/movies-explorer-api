const mongoose = require('mongoose');
const { BadRequestError, NotFoundError, ForbiddenError } = require('../errors/index');
const {
  CREATED_CODE, BAD_REQUEST_MESSAGE, NOT_FOUND_MOVIE_MESSAGE, FORBIDDEN_MESSAGE,
} = require('../utils/constants');
const Movie = require('../models/movie');

const getUserMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({ owner: userId }).sort({ createdAt: -1 }).populate('owner')
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  const ownerId = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: ownerId,
  })
    .then((movie) => {
      movie.populate('owner')
        .then(() => res.status(CREATED_CODE).send(movie))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(BAD_REQUEST_MESSAGE));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .orFail(() => new NotFoundError(NOT_FOUND_MOVIE_MESSAGE))
    .then((movie) => {
      const ownerId = movie.owner.toString();
      const userId = req.user._id;
      if (ownerId !== userId) {
        return next(new ForbiddenError(FORBIDDEN_MESSAGE));
      }
      return movie.deleteOne(movie)
        .then((deletedMovie) => res.send(deletedMovie));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError(BAD_REQUEST_MESSAGE));
      }
      return next(err);
    });
};

module.exports = {
  getUserMovies,
  createMovie,
  deleteMovie,
};
