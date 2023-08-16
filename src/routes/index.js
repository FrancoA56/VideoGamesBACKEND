const { Router } = require('express');
const getGameById = require('../controllers/getGameById');
const getGameByName = require('../controllers/getGameByName');
const login = require('../controllers/login');
const postUser = require('../controllers/postUser');

const router = Router();


router.get('/detail/:id', getGameById); 
router.get('/login', login); 
router.get('/search', getGameByName);
router.get('/register', postUser); 


module.exports = router;
