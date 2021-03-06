const Sequelize = require("sequelize");
const database = require("../database");


const Poemas = database.define("poemas", {
  id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
  },
  nome: {
      type: Sequelize.STRING,
      allowNull: false,
  },
  autor: {
      type: Sequelize.STRING,
      allowNull: false,
  },
  texto: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imagem: {
    type: Sequelize.STRING,
    allowNull: false,
  },
},{
  freezeTableName: true,
  timestamps: false,
  createdAt: false,
  updatedAt: false,
})

module.exports = Poemas;
