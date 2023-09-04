require("dotenv").config();
const axios = require("axios");
const { Videogame } = require("../db");
const { API_KEY } = process.env;

const URL = "https://api.rawg.io/api/games";

const getGameByName = async (req, res) => {
  const SLUG = req.params.slug;
  const formattedSlug = SLUG.replace(/ /g, "-").toLowerCase();
  try {
    const { data } = await axios(`${URL}?key=${API_KEY}`);

    const findGames = data.results.filter((game) =>
      game.slug.includes(formattedSlug)
    );

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
        genres,
        platforms,
        tags,
      }) => {
        const platformNames = platforms.map(
          (platform) => platform.platform.name
        );
        const genreIds = genres.map((genre) => genre.id);
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
          genreIds,
          platforms: platformNames,
          tags: tagNames,
        };
      }
    );

    const savedGames = await Promise.all(
      gamesToSave.map(async (game) => {
        const [existingGame, created] = await Videogame.findOrCreate({
          where: { id: game.id },
          defaults: game,
        });

        if (!created) {
          return existingGame;
        }

        existingGame.addGenres(game.genreIds);

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
