const data = require('../lib/data');
var fs =require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
persons = JSON.parse(fs.readFileSync('persons.txt'))
console.log(persons)

test('writing in the file - pass', () => {
    const newPerson = {
        name: "Test",
        height: 180,
        hair: "black"
      };
      persons.push(newPerson)
      data.writeFile(persons)
      persons = JSON.parse(fs.readFileSync('persons.txt'))
      const person = persons.filter(c => c.name === 'Test')
      expect(person[0].name).toBe('Test')
});
