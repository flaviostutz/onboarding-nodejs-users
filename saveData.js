const fs = require('fs');

// Save data to file before shutting down the server
function saveDataToFile() {
  const data = JSON.stringify(people);
  fs.writeFileSync(dataFilePath, data, 'utf-8');
}

exports.module = saveDataToFile;