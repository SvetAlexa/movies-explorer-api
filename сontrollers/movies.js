const mongoose = require('mongoose');
const Movie = require('../models/movie');

const getUserMovies = (req, res) => {
  const userId = req.user._id;
  Movie.find({ owner: userId }).sort({ createdAt: -1 }).populate('owner')
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => res.status(500).send(err.message));
};

const createMovie = (req, res) => {
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
        .then(() => res.status(201).send(movie))
        .catch((err) => res.status(400).send(err.message));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send('Переданы некорректные данные пользователя');
      }
      return res.status(500).send(err.message);
    });
};

const deleteMovie = (req, res) => {
  const { id } = req.params;
  Movie.findById(id)
    .orFail(() => res.status(404).send('Фильм с указанным _id не найден'))
    .then((movie) => {
      const ownerId = movie.owner.toString();
      const userId = req.user._id;
      if (ownerId !== userId) {
        return res.status(403).send('Нет прав для удаления');
      }
      return movie.deleteOne(movie)
        .then((deletedMovie) => res.send(deletedMovie));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res.status(400).send('Переданы некорректные данные');
      }
      return res.status(500).send(err.message);
    });
};

module.exports = {
  getUserMovies,
  createMovie,
  deleteMovie,
};
