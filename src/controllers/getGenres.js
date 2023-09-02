require("dotenv").config();
const axios = require("axios");
const { Genres } = require("../db");

const { API_KEY } = process.env;

const URL = "https://api.rawg.io/api/genres";

const getGenres = async (req, res) => {
  try {
    const response = await axios.get(`${URL}?key=${API_KEY}`);

    if (response.data && response.data.results) {
      const genres = response.data.results.map(({ id, name }) => ({
        id,
        name,
      }));

      const savedGenres = await Promise.all(
        genres.map(async (genre) => {
          return await Genres.findOrCreate({
            where: { id: genre.id },
            defaults: { name: genre.name },
          });
        })
      );

      res.status(200).json(savedGenres);
    } else {
      res.status(404).json("Genre already saved");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getGenres;
