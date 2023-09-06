const { Videogame } = require("../db");

const createGame = async (req, res) => {
  const {
    name,
    released,
    rating_top,
    playtime,
    esrb_rating,
    genres,
    background_image,
  } = req.body;

  try {
    if (
      !name ||
      !released ||
      !rating_top ||
      !playtime ||
      !esrb_rating ||
      !genres ||
      !background_image
    ) {
      return res.status(400).json({ error: "Missing data" });
    }

    const getRandomInt = (max = 100) => {
      return Math.floor(Math.random() * max);
    };
    const game = await Videogame.create({
      id: getRandomInt(),
      name,
      released,
      rating: rating_top,
      playtime,
      rating_top,
      esrb_rating,
      background_image,
    });

    // ...

    const lowerGenres = genres.toLowerCase();

    switch (lowerGenres) {
      case "action":
        game.addGenres(4);
        break;

      case "indie":
        game.addGenres(51);
        break;

      case "adventure":
        game.addGenres(3);
        break;

      case "rpg":
        game.addGenres(5);
        break;

      case "strategy":
        game.addGenres(10);
        break;

      case "shooter":
        game.addGenres(2);
        break;

      case "casual":
        game.addGenres(40);
        break;

      case "simulation":
        game.addGenres(14);
        break;

      case "puzzle":
        game.addGenres(7);
        break;

      case "arcade":
        game.addGenres(11);
        break;

      case "platformer":
        game.addGenres(83);
        break;

      case "racing":
        game.addGenres(1);
        break;

      case "sports":
        game.addGenres(15);
        break;

      case "fighting":
        game.addGenres(6);
        break;

      case "family":
        game.addGenres(19);
        break;

      case "board":
        game.addGenres(28);
        break;

      case "educational":
        game.addGenres(34);
        break;

      case "card":
        game.addGenres(17);
        break;

      default:
        break;
    }

    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createGame;
