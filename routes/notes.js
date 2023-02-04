const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");

notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.post("/", (req, res) => {
  console.log(req.body);
  const { title, text } = req.body;
  const newNote = { title, text, id: uuidv4() };

  readAndAppend(newNote, "./db/db.json");
  res.json(newNote);
});

notes.delete("/:id", (req, res) => {
  readFromFile("./db/db.json").then((data) => {
    const notes = JSON.parse(data);
    const updatedNotes = notes.filter((note) => note.id !== req.params.id);
    writeToFile("./db/db.json", updatedNotes);
    res.json({ ok: true });
  });
});

module.exports = notes;
