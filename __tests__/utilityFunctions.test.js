const fs = require('fs');
const fileData = JSON.parse(fs.readFileSync('./user.json'));
const { validationUserPost, addUserPost, putUserbyId, deleteUserById, getUserById, readFromUserFile } = require("../utilityFunctions");

/*
the function below i made because i thought it is maybe better to don't use hardcoded data, if it is better like this then the user and objects can be replaced by  
randomWholeUserFromFile and randomUserNameFromFile, if not i will remove this in the next PR.
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
const userNumber = getRandomInt(fileData.length);
const randomWholeUserFromFile = fileData[userNumber];
const randomUserNameFromFile = randomWholeUserFromFile.name;
*/

//this test is not perfect because i still have this issue with the append part mentioned in the utilityFunctions file.
test('testPostAddUser', () => {
  expect(addUserPost({
    "name": "unitTestUser",
    "height": 190,
    "hair": "Black"
  })).toBe(true);
});

// this test is not perfect because i still have this issue with the append part mentioned in the utilityFunctions file.
test('testPutUserById', () => {
  expect(putUserbyId({
    "name": "unitTestUser",
    "height": 190,
    "hair": "Black"
  }, "unitTestUser")).toBe(true);
});

test('testGetUserById', () => {
  expect(getUserById("unitTestUser")).toStrictEqual({
    "name": "unitTestUser",
    "height": 190,
    "hair": "Black"
  });
});

test('testGetUserById', () => {
  expect(getUserById("MrUnknown")).toBe(false);
});

test('testPostValidationUser', () => {
  expect(validationUserPost({
    "name": "unitTestUser",
    "height": 190,
    "hair": "Black"
  })).toBe(true);
});

test('testPostValidationUser', () => {
  expect(validationUserPost({
    "name": "ToShortUser",
    "height": 48,
    "hair": "Bold"
  })).toBe(false);
});

test('testDeleteUserById', () => {
  expect(deleteUserById("MrUnknown")).toBe(false);
});

test('testDeleteUserById', () => {
  expect(deleteUserById("unitTestUser")).toBe(true);
});

// this hardcoded check is something i don't like.
test('testReadFromUserFile', () => {
  expect(readFromUserFile()).toStrictEqual([{ "hair": "Black", "height": 165, "name": "Usman" }, { "hair": "Black", "height": 145, "name": "Flavio" }, { "hair": "yellow", "height": 180, "name": "Henk" }]);
});

// 85 lines of utilityfunctions, here we have 62 lines of testing, 62/85 * 100 = 72.9 test coverage






