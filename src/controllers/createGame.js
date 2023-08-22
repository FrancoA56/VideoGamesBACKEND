const { Videogame } = require("../db");

const createGame = async (req, res) => {
  const { id, name, release, rating_top, playtime, esrb_rating } = req.body;

  try {
    if (!id || !name || !release || !rating_top || !playtime || !esrb_rating)
      return res.status(400).json({ error: "Missing data" });
    const game = await Videogame.create({
      id,
      name,
      release,
      rating: rating_top,
      playtime,
      rating_top,
      esrb_rating,
    });

    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createGame;
