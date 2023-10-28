const router = require('express').Router();
const { getUserMovies, createMovie, deleteMovie } = require('../сontrollers/movies');
const { createMovieValidator, deleteMovieValidator } = require('../validation/validation');

router.get('/', getUserMovies);
router.post('/', createMovieValidator, createMovie);
router.delete('/:id', deleteMovieValidator, deleteMovie);

module.exports = router;
