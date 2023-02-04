const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

notes.get('/' , (res , req) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})


module.exports = notes