require("dotenv").config();
const axios = require("axios");
const { Videogame } = require("../db");
const { API_KEY } = process.env;

const URL = "https://api.rawg.io/api/games";

const getGames = async (req, res) => {
  const { SLUG } = req.query;
  const formattedSlug = SLUG?.replace(/ /g, "-")?.toLowerCase();

  try {
    const { data } = await axios(`${URL}?key=${API_KEY}`);

 
    const everyGames = !SLUG ? data.results.filter((games) => games.rating > 3) : data.results.filter((game) =>
    game.slug.includes(formattedSlug)
  );

    const gamesToSave = everyGames.map(
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
        parent_platforms,
        tags,
      }) => {
        const platformNames = parent_platforms.map(
          (platform) => platform.platform.slug
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
      gamesToSave.map(
        async ({
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
          platforms,
          tags
        }) => {
          const [existingGame, created] = await Videogame.findOrCreate({
            where: { id },
            defaults: {
              name,
              released,
              background_image,
              rating,
              rating_top,
              playtime,
              owned,
              esrb_rating,
              platforms,
              tags
            },
          });  

          if (!created) {
            return existingGame;
          }

          existingGame.addGenres(genreIds);

          return existingGame;
        }
      )
    );

    if (savedGames.length === 0) {
      res.status(404).json("Game not found");
    } else return res.status(200).json(gamesToSave);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getGames;
