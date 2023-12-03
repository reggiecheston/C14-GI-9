const chalk = require("chalk");
const fs = require("fs");

// add note function
const addNote = (title, body) => {
  // loads in notes
  const notes = loadNotes();

  // stores value if a note with the same title already exists
  const duplicateNote = notes.find((note) => note.title === title);

  // adds note to the object if a note with the same title doesn't already exist
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });

    // updates notes list
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    // Error message if a note with the same title already exists
    console.log(chalk.red.inverse("Note title taken!"));
  }
};

// Saves notes according to any changes made following the addNotes and removeNotes functions
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

//  remove note function
const removeNote = (title) => {
  const notes = loadNotes();

  // stores the value of all notes whose titles don't equal the title input
  const notesToKeep = notes.filter((note) => note.title !== title);

  // conditional: if the length has changes then...
  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse("Note removed!"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }
};

// list notes function
const listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.inverse("Your notes:"));
  // iterates through object to print each note to the console
  notes.forEach((note) =>
    console.log(chalk.bold.underline(`${note.title}:`), ` ${note.body}`)
  );
};

// read note function
const readNote = (title) => {
  const notes = loadNotes();
  // stores the value of the not that matches the input (if any)
  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(chalk.inverse(`${note.title}:`), ` ${note.body}`);
  } else {
    console.log(chalk.red.inverse("Note not found!"));
  }
};

// loads in notes to be modified or read by our functions
const loadNotes = () => {
  try {
    // stores binary of the object
    const dataBuffer = fs.readFileSync("notes.json");
    // converts binary to string
    const dataJSON = dataBuffer.toString();
    // returns corresponding object
    return JSON.parse(dataJSON);
  } catch (e) {
    // returns empty object if there's no data to be read
    return [];
  }
};

// exports functions to app.js
module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
