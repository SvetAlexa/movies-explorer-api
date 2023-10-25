const router = require('express').Router();
const { getUserMovies, createMovie, deleteMovie } = require('../сontrollers/movies');

router.get('/', getUserMovies);
router.post('/', createMovie);
router.delete('/:id', deleteMovie);

module.exports = router;
