"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Notebooks }) {
      this.belongsTo(Notebooks, { foreignKey: "notebook_id" });
    }
  }
  Notes.init(
    {
      tag: DataTypes.TEXT,
      notes: DataTypes.TEXT,
      notebook_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Notes",
    }
  );
  return Notes;
};
