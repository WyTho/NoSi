const database = require("../util/database.js");
const hardwaretemplate = require("./backup3.json");

database.insert("area", hardwaretemplate, () => console.log(`DBSEED - Inserted! ${hardwaretemplate}`));

