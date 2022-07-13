const express = require('express');
const bodyParser = require('body-parser');
const { reset } = require('nodemon');
var myUtilityFunctions = require('./utilityFunctions.js');

const app = express();

app.use(bodyParser.json());

app.get('/users', (req, res) => {
    const jsonData = require('./user.json');
    res.status(200).json({
        message: 'Successfully retrieved the users!',
        result: jsonData
    });
});

// get one specific user
app.get("/users/:Id", (req, res) => {
    myUtilityFunctions.getUserById(req, res);
});

app.post("/users", (req, res) => {
    if (myUtilityFunctions.validationUser(req, res) != undefined) {
        return myUtilityFunctions.validationUser(req, res);
    } else {
        return myUtilityFunctions.addUser(req, res);
    }
});

//now i can update any parameter of users, ot a total user if i change a little bit at line 58
app.put("/users/:Id", (req, res) => {
    myUtilityFunctions.putUserbyId(req, res);
});

// delete a user named by Id
app.delete("/users/:Id", (req, res) => {
    myUtilityFunctions.deleteUserById(req, res);
});

app.listen(3000, () => console.log('server started'));
