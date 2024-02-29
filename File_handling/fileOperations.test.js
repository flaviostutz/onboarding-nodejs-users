const fs = require('fs')

const {persons, saveDataToFile} = require('./fileOperations.js')

test('Reading data from file', () => {
    const readMe = 'persons.json'
    const testData = fs.readFileSync(readMe, 'utf-8')
    const expectedData = JSON.parse(testData)
    expect(expectedData).toStrictEqual(persons)
})

test('Saving data to file', () => {
    const readMe2 = 'persons2.json'
    let persons2 = []
    fs.writeFileSync(readMe2, JSON.stringify(persons2, null, 2), 'utf-8');
    const fileData = fs.readFileSync(readMe2, 'utf-8')
    const parsedData = JSON.parse(fileData)
    expect(parsedData).toEqual(persons2)
})