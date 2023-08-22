const { Router } = require('express');
const getGameById = require('../controllers/getGameById');
const getGameByName = require('../controllers/getGameByName');
const getGames = require('../controllers/getGames');
const login = require('../controllers/login');
const postUser = require('../controllers/postUser');
const createGame = require('../controllers/createGame');


const router = Router();


router.get('/detail/:id', getGameById); 
router.get('/login', login); 
router.get('/home/:slug', getGameByName);
router.get('/home', getGames);
router.post('/register', postUser); 
router.post('/createGame', createGame); 


module.exports = router;
