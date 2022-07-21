const express = require('express');
const bodyParser = require('body-parser');
const { exit } = require('process');
const app = express();

app.use(bodyParser.json());

// I declare these lines so they are global here so i dont have to declare them in every function.
// The append part does not work anymore because when reading the file user.json when not available the app crashes, i dont have a solution for this yet.

const fs = require('fs');
const fileData = JSON.parse(fs.readFileSync('user.json'));
const path = './user.json';

const validationUserPost = (userPostData) => {
    const postedName = userPostData.name;
    const postedHair = userPostData.hair;
    const postedHeight = userPostData.height;
    var regEx = /^[A-Za-z]+$/;
    if (postedName.match(regEx) && postedHair.match(regEx) &&
        postedName.length >= 4 && postedName.length <= 50 && postedHeight > 50 && postedHeight < 250) {
        return true;
    } else {
        return false;
    }
}

const addUserPost = (userPostData) => {
    if (fs.existsSync(path) != true) {
        fs.appendFileSync('user.json', JSON.stringify([userPostData], null, 2));
    } else {
        fileData.push(userPostData)
        fs.writeFileSync('user.json', JSON.stringify(fileData, null, 2));
    }
}

const putUserbyId = (userPutData, parameterId) => {
    if (fs.existsSync(path) != true) {
        fs.appendFileSync('user.json', JSON.stringify([userPutData], null, 2));
    }
    let indexPut = fileData.findIndex(updatedObject => {
        return updatedObject.name === `${parameterId}`;
    });
    if (indexPut > -1) {
        fileData.splice(indexPut, 1, userPutData);
        fs.writeFileSync('user.json', JSON.stringify(fileData, null, 2));
        return true;
    } else {
        return false;
    }
}

const deleteUserById = (parameterId) => {
    const tobedeletedObject = parameterId;
    let indexDel = fileData.findIndex(tobedeletedObject => {
        return tobedeletedObject.name === `${parameterId}`;
    });
    if (indexDel > -1) {
        fileData.splice(indexDel, 1);
        fs.writeFileSync('user.json', JSON.stringify(fileData, null, 2));
        return true;
    } else if (indexDel < 0) {
        return false;
    }
}

const getUserById = (requestedId) => {
    const requestedObject = requestedId;
    let indexGet = fileData.findIndex(requestedObject => {
        return requestedObject.name === `${requestedId}`;
    })
    const responseUserFile = fileData[indexGet];
    if (indexGet > -1) {
        return responseUserFile;
    }
    else {
        return false;
    }
};

const readFromUserFile = () => {
    return fileData;
}

module.exports = {
    validationUserPost,
    addUserPost,
    getUserById,
    putUserbyId,
    deleteUserById,
    readFromUserFile,
}








