var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
const config = require('../config.json');

const TAG = "Database";
const Debugger = require('./debug.js');
const Debug = Debugger(TAG);

// documentation for use of MongoDB database can be found online
// Connection URL
const url = `${config.database.url}:${config.database.port}/${config.database.scheme}`;

// Use connect method to connect to the server
function connect(callback){
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        Debug("Connected successfully to server");
        callback(db);
        db.close();
    });
}

function insert(dbName, item ,callback) {
    connect(db => {
        let collection = db.collection(dbName);
        collection.insertOne(item, function(err, result) {
            callback(result);
        });
    });
}

function find(dbName, query, filter = () => {return true;}){
    return new Promise((resolve, reject) => {
        connect(db =>{
            let collection = db.collection(dbName);
            collection.find(query).toArray(function(err, docs) {
                if(err != null) reject(err);
                let results = docs.filter(filter);
                Debug("Found the following records");
                Debug(results);
                resolve(results);
            });
        });
    });

}

function update(dbName, query, newObj, callback){
    connect(db=>{
        let collection = db.collection(dbName);
        collection.updateOne(query, newObj, (err) => {
            if(!err){
                callback("success");
            }
        });
    });
}
module.exports.insert = insert;
module.exports.find = find;
module.exports.update = update;
