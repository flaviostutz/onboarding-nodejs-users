import fs from 'fs';

export function savePersons(persons) {
  fs.writeFile("./persons.json", JSON.stringify(persons), "utf-8", (err) => {
    // console.log(err);
  });

  //todo -> check if has any errors while saving and return so i can show the error to the user
};

export function syncStart() {
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