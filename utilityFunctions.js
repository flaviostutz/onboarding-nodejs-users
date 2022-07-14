const express = require('express');
const bodyParser = require('body-parser');
const { exit } = require('process');
const app = express();

app.use(bodyParser.json());

const validationUserPost = (req, res) => {
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
    }
}

const addUserPost = (req, res) => {
    const fs = require('fs');
    const path = './user.json';
    if (fs.existsSync(path) != true) {
        fs.appendFileSync('user.json', JSON.stringify([req.body], null, 2));
    } else {
        const fileData = JSON.parse(fs.readFileSync('user.json'))
        fileData.push(req.body)
        fs.writeFileSync('user.json', JSON.stringify(fileData, null, 2));
    }
    res.status(201).json({
        message: `Successfully created the user ${req.body.name}`,
    })
}
// The first if add a user and creates the file if the user.json file does not exist yet.
const putUserbyId = (req, res) => {
    const fs = require('fs');
    const path = './user.json';
    if (fs.existsSync(path) != true) {
        fs.appendFileSync('user.json', JSON.stringify([req.body], null, 2));
        res.status(201).json({
            message: `Successfully created a file and put user ${req.body.name} in it!`,
        })
    }
    const jsonData = require('./user.json');
    const updatedObject = req.params.Id;
    let indexPut = jsonData.findIndex(updatedObject => {
        return updatedObject.name === `${req.params.Id}`;
    });
    if (indexPut > -1) {
        const fileData = JSON.parse(fs.readFileSync('user.json'))
        fileData.splice(indexPut, 1, req.body);
        fs.writeFileSync('user.json', JSON.stringify(fileData, null, 2));
        res.status(200).json({
            message: `Successfully changed the user ${req.body.name}!`,
        })
    } else if (indexPut < 0) {
        res.status(404).json({
            message: `The user ${req.body.name} is not found!`,
        })
    }
}

const deleteUserById = (req, res) => {
    const fs = require('fs');
    const jsonData = require('./user.json');
    const tobedeletedObject = req.params.Id;
    let indexDel = jsonData.findIndex(tobedeletedObject => {
        return tobedeletedObject.name === `${req.params.Id}`;
    });
    if (indexDel > -1) {
        const fileData = JSON.parse(fs.readFileSync('user.json'))
        fileData.splice(indexDel, 1);
        fs.writeFileSync('user.json', JSON.stringify(fileData, null, 2));
        res.status(200).json({
            message: `Successfully deleted the user ${req.params.Id}!`,
        })
    } else if (indexDel < 0) {
        res.status(404).json({
            message: `The user ${req.params.Id} is not found!`,
        })
    }
}

const getUserById = (req, res) => {
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
}

module.exports = {
    validationUserPost,
    addUserPost,
    getUserById,
    putUserbyId,
    deleteUserById,
}








