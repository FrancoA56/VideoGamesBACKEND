const axios = require("axios");

const URL = "https://api.rawg.io/api/games";

const getGameByName = async (req, res) => {
  const name = parseInt(req.query.name);

  try {
    const { data } = await axios(`${URL}${id}`);
    const {
      id,
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

    return id
      ? res.status(200).json(game)
      : res.status(404).json("Game not found");
  } catch (error) {
    res.status(404).json({error: error.message});
  }
};


module.exports = getGameByName;