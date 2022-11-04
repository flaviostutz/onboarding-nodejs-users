const fs = require("fs");

exports.savePersons = function (persons) {
  fs.writeFile("./persons.json", JSON.stringify(persons), "utf-8", (err) => {
    console.log(err);
  });

  //todo -> check if has any errors while saving and return so i can show the error to the user
};

exports.syncStart = function () {
// function syncStart() {
  let persons = [];
  try {
    let readedFile = fs.readFileSync("./persons.json");
    if (readedFile) {
      persons = JSON.parse(readedFile);
    }
  } catch (e) {
    persons = [];
  }
  if (persons) return persons;
}