const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Videogame", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    background_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    released: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    esrb_rating: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    playtime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating_top: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    owned: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    genres: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  });
};
