const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

app.get("/person/:name", (req, res) => {
  const idadeRandom = Math.floor(Math.random() * (80 - 18) + 18);

  const jsonResponse = JSON.parse(`{
        "person": {
            "name": "${req.params.name}",
            "idade": "${idadeRandom}"
        } 
    }`);
  res.send(jsonResponse);
});

let persons = [];

(() => {
  fs.readFile("./persons.txt", (err, data) => {
    if (data !== undefined) {
      persons = JSON.parse(data);
      if (err) {
        console.log("Cannot read file");
        console.log(err);
      }
    } else {
      console.log(`persons.txt is empty`);
    }
  });
})();

function savePersons() {
  fs.writeFile("./persons.txt", JSON.stringify(persons), "utf-8", (err) => {
    console.log(err);
  });

  //todo -> check if has any errors while saving and return so i can show the error to the user
}

app.post("/persons", (req, res) => {
  const person = req.body;
  const isPersonEmpty = person.length === 0;
  const regex = /^[A-Za-z]+$/;
  personNameLength = person.name.length;
  personHeight = person.height;

  if (!isPersonEmpty && regex.test(person.name)) {
    if (personNameLength < 4) {
      res.status(400).send(`the name is too short(minimum 4 characters)`);
      res.end();
      return;
    } else if (personNameLength > 50) {
      res.status(400).send(`the name is too long(maximum 50 characters)`);
      res.end();
      return;
    }

    if (personHeight < 50) {
      // check height of person
      res.status(400).send(`the height is too low(minimum 50)`);
      res.end();
      return;
    } else if (personHeight > 250) {
      res.status(400).send(`the height is too high(maximum 250)`);
      res.end();
      return;
    }
    persons.push(person);
    savePersons();
    res
      .status(200)
      .send(`person <strong>${person.name}</strong> was created successfully`);
  } else if (!isPersonEmpty) {
    res.status(400).send(`your name '${person.name}' should only have letters`);
  } else {
    res.status(400);
  }
  res.end();
});

app.get("/persons", (req, res) => {
  const isPersonsEmpty = persons.length === 0;
  if (isPersonsEmpty) {
    res.status(404).send(`<h1>404</h1><p>there's <strong>no one</strong>`);
  } else {
    res.status(200).send(persons);
  }
});

app.get("/persons/:name", (req, res) => {
  const nameReq = req.params.name;
  const finded = persons.find((person) => person.name === nameReq);
  console.log(finded)

  let responseByName;

  if (finded) {
    responseByName = persons.filter((person) => person.name === nameReq);
    res.status(200).send(responseByName);
  } else {
    res
      .status(204)
      .send(
        `<h1>204</h1><p>the person: <strong>${nameReq}</strong>, was not found</p>`
      );
    return;
  }
});

app.delete("/persons/:name", (req, res) => {
  const nameReq = req.params.name || "";
  const deletedPerson = persons.filter((person) => person.name === nameReq);
  const filteredPersons = persons.filter((person) => person.name !== nameReq);

  if (deletedPerson.length > 0) {
    res.status(202).send(`user: ${nameReq} was deleted`);
    persons = filteredPersons;
    savePersons();
    return;
  }

  if (deletedPerson.length <= 0) {
    res.status(204).send(`${nameReq} person not found`);
    return;
  }

  res.status(400).send(`<h1>400</h1><br /> <p>Bad request</p>`);
});

app.put("/persons/:name", (req, res) => {
  const { query } = req;
  const nameReq = req.params.name;
  function personExist() {
    let namef = persons.filter((person) => person.name === nameReq);
    if (namef.length !== 0) {
      return namef[0].name;
    } else {
      return false;
    }
  }
  exist = personExist();

  if (exist && query) {
    let update = persons.map((person) => {
      if (person.name === nameReq) {
        let updatedPerson = { ...person, ...query };
        return updatedPerson;
      } else {
        return person;
      }
    });
    persons = update;
    res.status(202).send(`${nameReq} updated successfully`);
  } else if (exist) {
    res.status(400).send(`bad <strong>query</strong> request`);
  } else {
    res.status(404).send(`${nameReq} was not find`);
  }
  savePersons();
  res.end();
});

app.listen(8080, () => console.log("listening on port 8080"));
