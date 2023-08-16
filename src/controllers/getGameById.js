const axios = require("axios");

const URL = "https://api.rawg.io/api/games/";

const getGameById = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const { data } = await axios(`${URL}${id}`);
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
    res.status(404).json({error: error.message});
  }
};


module.exports = getGameById;