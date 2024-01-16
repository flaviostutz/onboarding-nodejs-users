const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { saveDataToFile } = require('./saveData');

const app = express();
const port = 3000;

app.use(bodyParser.json());
let people = [];

//Load data from file if it exists
const dataFilePath = 'peopleList.json';
if (fs.existsSync(dataFilePath)) {
  const data = fs.readFileSync(dataFilePath, 'utf-8');
  people = JSON.parse(data);
  console.log(people);
}

// Validation functions
function validateName(name) {
  const nameRegex = /^[A-Za-z]+$/;
  return nameRegex.test(name) && name.length >= 4 && name.length <= 50;
}

function validateHeight(height) {
  return height >= 50 && height <= 250;
}

// Routes
app.get('/people', (req, res) => {
  try {
    if (!people || people.length === 0) {
      throw new Error('No people found.');
    }
    if (!Array.isArray(people)) {
      throw new Error('Invalid data format. Expected an array.');
    }
    const formattedPeople = people.map((person) => {
      return { name: person.name, height: person.height, hair: person.hair };
    });

    res.json({ success: true, people: formattedPeople });
  } catch (error) {
    console.error('Error listing people:', error);
    res.status(500).json({ success: false, error: 'Internal server error. Please try again later.' });
  }
});

app.get('/people/:name', (req, res) => {
  const personName = req.params.name;
    const person = people.find((p) => p.name === personName);
    if (!person) {
      return res.status(404).json({ error: 'Person not found.' });
    }
    res.json({ person });
  })

app.post('/people', (req, res) => {
  const { name, height, hair } = req.body;
    if (!validateName(name) || !validateHeight(height)) {
      return res.status(400).json({ error: 'Invalid name or height. Please check the instruction.' });
    }
    try {
      people.push({ name, height, hair });
      res.status(201).json({ message: 'Person created successfully.', person: { name, height, hair } });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
  })

app.put('/people/:name', (req, res) => {
  const personName = req.params.name;
  const index = people.findIndex((p) => p.name === personName); 
  if (index === -1) {
    return res.status(404).json({ error: 'Person not found.' });
  }
  const { height, hair } = req.body;
  if (!validateHeight(height)) {
    return res.status(400).json({ error: 'Invalid height. Please check the instructions.' });
  }
  // Update the person
  people[index].height = height;
  people[index].hair = hair;
  res.status(200).json({ message: 'Person updated successfully.', person: people[index] });
  });


app.delete('/people/:name', (req, res) => {
  const personName = req.params.name;
  const index = people.findIndex((p) => p.name === personName);
  if (index === -1) {
    return res.status(404).json({ error: 'Person not found.' });
  }
  people.splice(index, 1);
  res.json({ message: 'Person deleted successfully.' });
});

// Close the server and save data to file before shutting down the server
process.on('SIGINT', () => {
  saveDataToFile(people); // utility function imported from ./saveData.js
  process.exit();
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});