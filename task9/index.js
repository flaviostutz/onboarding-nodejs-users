const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const server = express();

server.use(bodyParser.json());

const readMe = 'persons.json';
let persons = [];


try {
    const data = fs.readFileSync(readMe, 'utf-8');
    persons = JSON.parse(data);
} catch (err) {
    console.log('Error loading data file. Starting with an empty array.');
}

const saveDataToFile = () => {
    try {
        fs.writeFileSync(readMe, JSON.stringify(persons, null, 2), 'utf-8');
        console.log('Data saved to file.');
    } catch (err) {
        console.error('Error saving data to file:', err);
    }
};

const validatePerson = (req, res, next) => {
    const { name, height } = req.body 

    if (!/^[a-zA-Z]+$/.test(name) || name.length < 4 || name.length > 50) {
        return res.status(400).json({error: 'Invalid name. It must consist of alphabetic characters and be between 4 and 50 characters'})
    }

    const numericHeight = parseFloat(height)
    if (isNaN(numericHeight) || numericHeight < 50 || numericHeight > 250) {
        return res.status(400).json({ error: 'Invalid height. It must be a number between 50 and 250.'})
    } else {
        next();
    }
    
}

server.post('/persons', validatePerson, (req, res) => {
    const newPerson = req.body;
    persons.push(newPerson);
    saveDataToFile();
    res.status(201).json(newPerson);
});

server.get('/persons', (req, res) => {
    res.json(persons);
});

server.get('/persons/:name', (req, res) => {
    const { name } = req.params;
    const person = persons.find((p) => p.name === name);

    if (person) {
        res.json(person);
    } else {
        res.status(404).json({ error: 'Person not found' });
    }
});

server.put('/persons/:name', (req, res) => {
    const { name } = req.params;
    const updatedPerson = req.body;
    const index = persons.findIndex((p) => p.name === name);

    if (index !== -1) {
        persons[index] = { ...persons[index], ...updatedPerson };
        saveDataToFile();
        res.json(persons[index]);
    } else {
        res.status(404).json({ error: 'Person not found' });
    }
});

server.delete('/persons/:name', (req, res) => {
    const { name } = req.params;
    const index = persons.findIndex((p) => p.name === name);

    if (index !== -1) {
        const deletedPerson = persons.splice(index, 1);
        saveDataToFile();
        res.json(deletedPerson);
    } else {
        res.status(404).json({ error: 'Person not found' });
    }
});

server.listen(8888, () => {
    console.log('Servidor Funcionando!');
});
