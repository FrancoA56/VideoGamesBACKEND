const { Router } = require('express');
const getGameById = require('../controllers/getGameById');
const getGames = require('../controllers/getGames');
const login = require('../controllers/login');
const postUser = require('../controllers/postUser');
const createGame = require('../controllers/createGame');
const getGenres = require('../controllers/getGenres');

const router = Router();


router.get('/detail/:id', getGameById); 
router.get('/login', login); 
router.get('/home', getGames);
router.get('/genres', getGenres);
router.post('/register', postUser); 
router.post('/createGame', createGame); 


module.exports = router;
