/*
Task 9:
Now, on top of the previous exercise, create a way of not losing the data after you restart NodeJS. 
Avoid external dependencies as possible.
Send a screenshot of your code and of a “list” call just after restarting NodeJS server.
*/

const express = require('express');
const bodyParser = require('body-parser');
const { reset } = require('nodemon');

const app = express();

app.use(bodyParser.json());

app.get('/users', (req, res) => {
    const jsonData = require('./user.json');
    res.status(200).json({
        message: 'Successfully retrieved the users!',
        result: jsonData
    });
});


// post one specific user in the body into users[] with a alphabetic validation on the name and hair.
app.post('/users', (req, res) => {
    const postedName = req.body.name;
    const postedHair = req.body.hair;
    const postedHeight = req.body.height;
    var regEx = /^[A-Za-z]+$/;  
    if (!postedName.match(regEx)) {
        res.status(400).json({
            message: 'You have to use only alphabetical characters in your name!',
        })
    } else if (!postedHair.match(regEx)) {

        res.status(400).json({
            message: 'You have to use only alphabetical characters in your hair!',
        })
    } else if (postedName.length <= 4 || postedName.length >= 50) {
        res.status(400).json({
            message: 'Your name length must be, between 5 and 50 characters!',
        })
    } else if (postedHeight < 50 || postedHeight > 250) {
        res.status(400).json({
            message: 'The height of this person should be, between 50 and 250!',
        })
    } else {
        const fs = require('fs');
        const path = './user.json';
        if (fs.existsSync(path) != true) {
            fs.appendFileSync('user.json', JSON.stringify([req.body], null, 2));
        } else {
            const fileData = JSON.parse(fs.readFileSync('user.json'))
            fileData.push(req.body)
            fs.writeFileSync('user.json', JSON.stringify(fileData, null, 2));
        }
        const jsonData = require('./user.json');
        res.status(201).json({
            message: 'Successfully created a specific user!',
            result: jsonData,
        })
    }
})

// get one specific user
app.get("/users/:Id", (req, res) => {
    const jsonData = require('./user.json');
    const requestedObject = req.params.Id;
    let indexGet = jsonData.findIndex(requestedObject => {
        return requestedObject.name === `${req.params.Id}`;
    });
    if (indexGet > -1) {
        res.status(200).json({
            message: 'Successfully retrieved a specific user!',
            result: jsonData[indexGet]
        });
    } else {
        res.status(404).json({
            message: 'Not Found',
        })
    }
});

//now i can update any parameter of users, ot a total user if i change a little bit at line 58
app.put("/users/:Id", (req, res) => {
    const jsonData = require('./user.json');
    const updatedObject = req.params.Id;
    let indexPut = jsonData.findIndex(updatedObject => {
        return updatedObject.name === `${req.params.Id}`;
    });
    if (indexPut > -1) {
        jsonData[indexPut] = req.body;
        res.status(200).json
    } else {
        res.status(404).json({
            message: 'Not Found',
        })
    }
    res.send('It works!');
});

// delete a user named by Id
app.delete("/users/:Id", (req, res) => {
    const jsonData = require('./user.json');
    const tobedeletedObject = req.params.Id;
    let indexDel = jsonData.findIndex(tobedeletedObject => {
        return tobedeletedObject.name === `${req.params.Id}`;
    });
    if (indexDel > -1) {
        jsonData.splice(indexDel, 1);
        res.status(200).json
        res.send(jsonData);
    } else {
        res.status(404).json({
            message: `${tobedeletedObject} Not Found`,
        });
    }
});

app.listen(3000, () => console.log('server started'));
