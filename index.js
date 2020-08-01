//git init 
// npm install mongodb@3.0.10 --save
// npm install assert@1.4.1 --save


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dboper = require("./operations.js")

const url = 'mongodb://127.0.0.1:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {

  assert.equal(err, null);

  console.log("Connected correctly to server");

  const db = client.db(dbname);
  
  dboper.insertDocument(db, { name: "Vadonut", description: 'Test'}, 'dishes', (result) => {
    console.log("Inserted Document:\n", result.ops);

    dboper.findDocument(db, 'dishes', (docs) => {
      console.log('Found Documents:\n', docs);

      dboper.updateDocument(db, {name: 'Vadonut'}, { description: 'Updated Test'}, 'dishes', (result) => {
        console.log('Updated Document:\n', result.result);

        dboper.findDocument(db, 'dishes', (docs) => {
          console.log('Found Documents:\n', docs);

          db.dropCollection('dishes', (result) => {
            console.log("Dropped Collection: ", result);

            client.close();
          });
        });
      });
    });
  });
});