const { Videogame } = require("../db");

const createGame = async (req, res) => {
  const {
    name,
    released,
    rating_top,
    playtime,
    esrb_rating,
    genreIds,
    background_image,
  } = req.body;

  try {
    if (
      !name ||
      !released ||
      !rating_top ||
      !playtime ||
      !esrb_rating ||
      !genreIds ||
      !background_image
    ) {
      return res.status(400).json({ error: "Missing data" });
    }
    const getRandomInt = (max = 100) => {
      return Math.floor(Math.random() * max);
    };
    const gameForRedux = {
      id: getRandomInt(),
      name,
      released,
      rating: rating_top,
      rating_top,
      playtime,
      esrb_rating,
      genreIds,
      background_image,
    }
 
    const game = await Videogame.create({
      id: getRandomInt(),
      name,
      released,
      rating: rating_top,
      playtime,
      rating_top,
      esrb_rating,
      background_image,
    });


    game.addGenres(genreIds);

    res.status(201).json(gameForRedux);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createGame;
