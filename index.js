import express from "express";
import { savePersons, syncStart } from "./updatePersons.js";
const app = express();

app.use(express.json());

let persons = syncStart();

app.post("/persons", (req, res) => {
  const person = req.body;
  const isPersonEmpty = person.length === 0;
  const regex = /^[A-Za-z]+$/;
  const personNameLength = person.name.length;
  const personHeight = person.height;

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
    savePersons(persons);
    res
      .status(201)
      .send(`person <strong>${person.name}</strong> was created successfully`);
  } else if (!isPersonEmpty) {
    res.status(400).send(`your name '${person.name}' should only have letters`);
  } 
  res.end();
});

app.get("/persons", (req, res) => {
    res.status(200).send(persons);
});

app.get("/persons/:name", (req, res) => {
  const nameReq = req.params.name;
  const finded = persons.find((person) => person.name === nameReq);

  let responseByName;

  if (finded) {
    responseByName = persons.filter((person) => person.name === nameReq);
    res.status(200).send(responseByName);
  } else {
    res
      .status(404)
      .send(
        `<h1>204</h1><p>the person: <strong>${nameReq}</strong>, was not found</p>`
      );
    return;
  }
});

app.put("/persons/:name", (req, res) => {
  const { body } = req;
  const nameReq = req.params.name;
  function personExist() {
    let namef = persons.filter((person) => person.name === nameReq);
    if (namef.length !== 0) {
      return namef[0].name;
    } else {
      return false;
    }
  }
  let exist = personExist();

  if (exist && body) {
    let update = persons.map((person) => {
      if (person.name === nameReq) {
        let updatedPerson = { ...person, ...body };
        return updatedPerson;
      } else {
        return person;
      }
    });
    persons = update;
    res.status(200).send(`${nameReq} updated successfully`);
  } else {
    res.status(404).send(`${nameReq} was not find`);
  }
  savePersons(persons);
  res.end();
});

app.delete("/persons/:name", (req, res) => {
  const nameReq = req.params.name || "";
  const deletedPerson = persons.filter((person) => person.name === nameReq);
  const filteredPersons = persons.filter((person) => person.name !== nameReq);

  if (deletedPerson.length > 0) {
    res.status(200).send(`user: ${nameReq} was deleted`);
    persons = filteredPersons;
    savePersons(persons);
  } else if (deletedPerson.length <= 0) {
    res.status(404).send(`${nameReq} person not found`);
  }
});


app.listen(8080, () => console.log("listening on port 8080"));

export default app;