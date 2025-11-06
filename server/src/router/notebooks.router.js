const express = require("express");

const { Notebooks } = require("../../db/models");
const { where } = require("sequelize");

const notebooksRouter = express.Router();

notebooksRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const notebooks = await Notebooks.findAll({
      where: { user_id: id },
    });
    res.status(200).json(notebooks);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

notebooksRouter.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    console.log(title, id);
    const newNotebook = await Notebooks.create({
      title: title,
      user_id: id,
    });
    res.status(200).json(newNotebook);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

notebooksRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const delNotebook = await Notebooks.destroy({
      where: { id: id },
    });
    res.status(200).json({ message: "Удалили блокнот" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = notebooksRouter;
