require("dotenv").config();
const axios = require("axios");
const { Videogame } = require("../db");
const { API_KEY } = process.env;

const URL = "https://api.rawg.io/api/games";

const getGameByName = async (req, res) => {
  const SLUG = req.params.slug;

  try {
    const { data } = await axios(`${URL}?key=${API_KEY}`);

    const findGames = data.results.filter((game) => game.slug.includes(SLUG));

    const gamesToSave = findGames.map(
      ({
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
      }) => {
        const platformNames = platforms.map(
          (platform) => platform.platform.name
        );
        const genreNames = genres.map((genre) => genre.name);
        const tagNames = tags.map((tag) => tag.name);
        
        return {
          id,
          name,
          released,
          background_image,
          rating,
          rating_top,
          playtime,
          owned,
          esrb_rating,
          platforms: platformNames,
          genres: genreNames,
          tags: tagNames,
        };
      }
    );

    const savedGames = await Promise.all(
      gamesToSave.map(async (game) => {
        const [existingGame, created] = await Videogame.findOrCreate({
          where: { ID: game.id }, 
          defaults: game 
        });
    
        if (!created) {
          return existingGame;
        }
    
        return existingGame;
      })
    );

    if (savedGames.length === 0) {
      res.status(404).json("Game not found");
    } else return res.status(200).json(savedGames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getGameByName;
