let MongoClient = require('mongodb').MongoClient,
    assert = require('assert');
const config = require('../config.json');
const url = `${config.database.url}:${config.database.port}/${config.database.scheme}`;

function connect(callback){
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to mongoDB");
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
                // console.log('docs:', docs);
                if(err != null) reject(err);
                let results = docs.filter(filter);
                // console.log("Found the following records");
                // console.log(results);
                resolve(results);
            });
        });
    });

}

function update(dbName, query, newObj, callback){
    connect(db => db.collection(dbName).updateOne(query, newObj, err => err ? callback("error") : callback("success")));
}

function getAllHardware(){
    return new Promise((resolve, reject) => {
        connect(db => {
            let collection = db.collection("area");
            collection.findOne({}, (err, hardware) => err != null ? reject(err) : resolve(hardware))
        })
    });
}

module.exports.insert = insert;
module.exports.find = find;
module.exports.update = update;
module.exports.getAllHardware = getAllHardware;
