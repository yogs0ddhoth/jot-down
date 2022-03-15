const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
  readFromFile('./db/notes_db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
  console.log(req.body);
  const { title, text } = req.body;
  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    readAndAppend(newNote, './db/notes_db.json');
    res.json(`${newNote} added successfully 🚀`);
  } else {
    res.error('Error in adding tip');
  }
});

notes.delete('/:id', (req, res) => {
  readFromFile('./db/notes_db.json')
  .then(data => JSON.parse(data))
  .then(data => {
    const newDb = data.filter(element => element.id !== req.params.id);
    writeToFile('./db/notes_db.json', newDb);
    
    res.json(`Note: ${req.params.id} has been deleted 🗑️`);
  })
});

module.exports = notes;