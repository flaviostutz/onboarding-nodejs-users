var fs =require('fs');

function writeFile(persons) {
    fs.writeFile('persons.txt', JSON.stringify(persons), (err) => {
        if(err){
            console.log(err)
            res.status(500).send({error: 'Error writing file!'})
        }
      })
}

module.exports = { writeFile };