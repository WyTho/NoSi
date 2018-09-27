const database = require("../util/database.js");
const hardwaretemplate = require("./backup3.json");
const TAG = "DBSEED";
const Debugger = require("../util/debug.js");
const Debug = Debugger(TAG);

database.insert("area", hardwaretemplate, () => Debug(`Inserted!`));

