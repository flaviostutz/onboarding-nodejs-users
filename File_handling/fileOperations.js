const fs = require('fs')

let persons = [];
const readMe = 'persons.json';

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

module.exports = {saveDataToFile, persons}