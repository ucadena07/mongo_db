//git init 
// npm install mongodb@3.0.10 --save
// npm install assert@1.4.1 --save


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dboper = require("./operations.js")

const url = 'mongodb://127.0.0.1:27017/';
const dbname = 'conFusion';

MongoClient.connect(url).then((client) => {

  console.log("Connected correctly to server");

  const db = client.db(dbname);
  
  dboper.insertDocument(db, { name: "Vadonut", description: 'Test'}, 'dishes')
  .then((result) => {

    console.log("Inserted Document:\n", result.ops);

     return dboper.findDocument(db, 'dishes')
  })
  .then((docs) => {
      
    console.log('Found Documents:\n', docs);

    return dboper.updateDocument(db, {name: 'Vadonut'}, { description: 'Updated Test'}, 'dishes') 
  })
  .then((result) => {

        console.log('Updated Document:\n', result.result);

        return dboper.findDocument(db, 'dishes')
  })
  .then((docs) => {

        console.log('Found Documents:\n', docs);

        return db.dropCollection('dishes')
  })
  .then((result) => {
          console.log("Dropped Collection: ", result);

          client.close();
  })
  .catch((err) => console.log(err));
})
.catch((err) => console.log(err));