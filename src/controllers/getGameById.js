require('dotenv').config();
const axios = require("axios");

const { API_KEY } = process.env;

const URL = "https://api.rawg.io/api/games/";

const getGameById = async (req, res) => {
  const id = req.params.id;

  try {
    const { data } = await axios(`${URL}${id}?key=${API_KEY}`);
    const {
      name,
      released,
      background_image,
      rating,
      rating_top,
      playtime,
      added_by_status: { owned },
      platforms,
      genres,
      tags,
      esrb_rating: { name: esrb_rating },
    } = data;
    const game = {
      id,
      name,
      released,
      background_image,
      rating,
      rating_top,
      playtime,
      owned,
      platforms,
      genres,
      tags,
      esrb_rating,
    };

    return name
      ? res.status(200).json(game)
      : res.status(404).json("Game not found");
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = getGameById;
