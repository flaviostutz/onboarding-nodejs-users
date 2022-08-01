const express = require('express');
const bodyParser = require('body-parser');
const { reset } = require('nodemon');
const { validationUserPost, addUserPost, putUserbyId, deleteUserById, getUserById, readFromUserFile } = require("./utilityFunctions");

const expressServer = express();

expressServer.use(bodyParser.json());

//Returns all the users.
expressServer.get('/users', (req, res) => {
    res.status(200).json({
        message: 'Successfully retrieved the users!',
        result: readFromUserFile(req, res)
    });
});

// Get user bij Id.
expressServer.get("/users/:Id", (req, res) => {
    const userFound = getUserById(req.params.Id);
    if (userFound) {
        res.status(200).json({
            message: 'Successfully retrieved a specific user!',
            result: userFound,
        });
    } else {
        res.status(404).json({
            message: 'Not Found',
        })
    }
});

// Validate and add users to the user.json, if the users file does not exist, creates the file with append.
expressServer.post("/users", (req, res) => {
    const postValidation = (validationUserPost(req.body));
    if (postValidation) {
        addUserPost(req.body);
        res.status(201).json({
            message: `The user ${req.body.name} is succesfully created!`
        });
    } else {
        res.status(403).json({
            message: 'The user cannot be validated!'
        })
    }
});

// The first if add a user and creates the file if the user.json file does not exist yet.
expressServer.put("/users/:Id", (req, res) => {
    const putValidation = putUserbyId(req.body, req.params.Id);
    if (putValidation) {
        res.status(200).json({
            message: `Successfully changed the user ${req.body.name}!`,
        })
    } else {
        res.status(404).json({
            message: `The user ${req.params.Id} does not exist!`,
        })
    }
});

// Delete a user bij Id.
expressServer.delete("/users/:Id", (req, res) => {
    const deleteValidation = deleteUserById(req.params.Id);
    if (deleteValidation) {
        res.status(200).json({
            message: `Successfully deleted the user ${req.params.Id}!`,
        })
    } else {
        res.status(404).json({
            message: `The user ${req.params.Id} is not found!`,
        })
    }
});
let httpServer;

const startServer = () => {
    httpServer = expressServer.listen(3000, () => console.log('server started'));
};

module.exports = {
    startServer
}

