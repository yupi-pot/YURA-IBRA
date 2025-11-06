const express = require("express");

const noteRouter = express.Router();

const { Notes } = require("../../db/models");
const { where } = require("sequelize");

noteRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allNotes = await Notes.findAll({
      where: { notebook_id: id },
    });
    res.status(200).json(allNotes);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

noteRouter.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { tag, notes, notebook_id } = req.body;

    const newNotes = await Notes.create({
      tag: tag,
      notes: notes,
      notebook_id: id,
    });
    res.status(200).json(newNotes);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

noteRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { tag, notes } = req.body;

    const findNote = await Notes.findbyPk(id);

    const updateNote = await Notes.update({ tag, notes });
    res.status(200).json(updateNote);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

noteRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const delNotes = await Notes.destroy({
      where: { id: id },
    });
    res.status(200).json({ message: "Удалили заметку" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = noteRouter;
