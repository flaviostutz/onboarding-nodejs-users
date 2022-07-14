const express = require('express');
const bodyParser = require('body-parser');
const { reset } = require('nodemon');
var myUtilityFunctions = require('./utilityFunctions.js');

const app = express();

app.use(bodyParser.json());

// Retrieves all the users
app.get('/users', (req, res) => {
    const jsonData = require('./user.json');
    res.status(200).json({
        message: 'Successfully retrieved the users!',
        result: jsonData
    });
});

// Get one specific user
app.get("/users/:Id", (req, res) => {
    myUtilityFunctions.getUserById(req, res);
});

// Post a user and create the file for it if needed
app.post("/users", (req, res) => {
    if (myUtilityFunctions.validationUserPost(req, res) == undefined) {
        return myUtilityFunctions.addUserPost(req, res);
    } else {
        return myUtilityFunctions.validationUserPost(req, res);
    }
});

// Update any variable of any user
app.put("/users/:Id", (req, res) => {
    myUtilityFunctions.putUserbyId(req, res);
});

// Delete a user
app.delete("/users/:Id", (req, res) => {
    myUtilityFunctions.deleteUserById(req, res);
});

app.listen(3000, () => console.log('server started'));
