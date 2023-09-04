const { Videogame } = require("../db");

const createGame = async (req, res) => {
  const { name, released, rating_top, playtime, esrb_rating, genres, background_image } = req.body;

  try {
    if (
      !name ||
      !released ||
      !rating_top ||
      !playtime ||
      !esrb_rating ||
      !genres ||
      !background_image
    ) {
      return res.status(400).json({ error: "Missing data" });
    }

    const getRandomInt = (max = 100) => {
      return Math.floor(Math.random() * max);
    }
    const game = await Videogame.create({
      id: getRandomInt(),
      name,
      released,
      rating: rating_top,
      playtime,
      rating_top,
      esrb_rating,
      background_image
    });

    game.addGenres(genres);

    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createGame;
