const fs = require('fs');

const dataFilePath = 'peopleList.json';

function saveDataToFile(data) {
  const jsonData = JSON.stringify(data);
  fs.writeFileSync(dataFilePath, jsonData, 'utf-8');
}

module.exports = { saveDataToFile };