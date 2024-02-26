const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');
var fs =require('fs');
const data = require('./lib/data')

const app = express();
app.use(bodyParser.json());
persons = JSON.parse(fs.readFileSync('persons.txt'))

app.get('/person', (req, res) => {
    res.json(persons);
});

app.get('/person/:name', (req, res) => {
    const person = persons.filter(c => c.name === req.params.name)
    if(person.length === 0) res.status(404).send({error: 'Not Found!!'});
    res.json(person)
});

app.post('/person', (req, res) => {
    const { error } = validatePerson(req.body)
    if (error) {
        res.status(400).send({error: error.details[0].message})
        return;
    }
    const newPerson = {
        name: req.body.name,
        height: req.body.height,
        hair: req.body.hair
      };
      persons.push(newPerson)
      data.writeFile(persons)
    res.status(201).json(req.body);
});

function validatePerson(person) {
    const schema = Joi.object({
        name: Joi.string().min(4).max(50).required(),
        height: Joi.number().min(50).max(250).required(),
        hair: Joi.string().required()
    });
    const validation = schema.validate(person);
    return validation;
}


app.delete('/person/:name', (req,res) => {
    const person = persons.filter(c => c.name === req.params.name)
    if(person.length === 0) res.status(404).send({error: 'Not Found!!'});
    const index = persons.indexOf(person)
    persons.splice(index,1)
    writeFile(persons)
    res.send(person)
})

app.put('/person/', (req, res) => {
    const person = persons.find(c => c.name === req.body.name)
    person.height = req.body.height
    person.hair = req.body.hair
    const index = persons.indexOf(person)
    persons.splice(index,1)
    persons.push(person)
    writeFile(persons)
    res.send(person)
})

app.listen(3000, () => console.log('server started'));