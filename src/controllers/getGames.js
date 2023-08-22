require("dotenv").config();
const axios = require("axios");

const { API_KEY } = process.env;

const URL = "https://api.rawg.io/api/games";

const getGames = async (req, res) => {
  try {
    const { data } = await axios(`${URL}?key=${API_KEY}`);
    
    const goodGames = data.results.filter((games) => games.rating > 3);

    const games = goodGames.map(
        ({
          id,
          name,
          slug,
          released,
          background_image,
          rating,
          rating_top,
          playtime,
          added_by_status: { owned },
          esrb_rating: { name: esrb_rating },
        }) => ({
          id,
          name,
          slug,
          released,
          background_image,
          rating,
          rating_top,
          playtime,
          owned,
          esrb_rating,
        })
      );
    if (!games) res.status(404).json("Game not found");
    res.status(200).json(games);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getGames;
