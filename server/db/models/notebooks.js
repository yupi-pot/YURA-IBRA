"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notebooks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Users, Notes }) {
      this.belongsTo(Users, { foreignKey: "user_id" });
      this.hasMany(Notes, { foreignKey: "notebook_id" });
    }
  }
  Notebooks.init(
    {
      user_id: DataTypes.INTEGER,
      title: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Notebooks",
    }
  );
  return Notebooks;
};
