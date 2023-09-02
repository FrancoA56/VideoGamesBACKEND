require("dotenv").config();
const axios = require("axios");

const { API_KEY } = process.env;

const URL = "https://api.rawg.io/api/games/";

const getGameById = async (req, res) => {
  const ID = req.params.id;

  try {
    const { data } = await axios(`${URL}${ID}?key=${API_KEY}`);
    const {
      id,
      name,
      released,
      background_image,
      rating,
      rating_top,
      playtime,
      added_by_status: { owned },
      esrb_rating: { name: esrb_rating },
      platforms,
      genres,
      tags,
    } = data;
    const platformNames = platforms.map((platform) => platform.platform.name);
    const modifiedPlatformNames = platformNames.join(', ');
    const genreNames = genres.map((genre) => genre.name);
    const modifiedGenreNames = genreNames.join(', ');
    const tagNames = tags.map((tag) => tag.name);
    const modifiedTagName = tagNames.join(', ');

    const game = {
      id,
      name,
      released,
      background_image,
      rating,
      rating_top,
      playtime,
      owned,
      esrb_rating,
      platforms: modifiedPlatformNames,
      genres: modifiedGenreNames,
      tags: modifiedTagName,
    };

    return name
      ? res.status(200).json(game)
      : res.status(404).json("Game not found");
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = getGameById;
