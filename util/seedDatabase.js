const database = require("../util/database.js");
const hardwaretemplate = require("../templates/hardwaretemplate.json").template;
const TAG = "DBSEED"
const Debugger = require("../util/debug.js");
const Debug = Debugger(TAG); 
/*
    This file is for seeding the initial database, only run this once!
*/

hardwaretemplate.forEach(x => {
    database.insert("hardware", x, () => Debug(`Inserted: ${x.name}`));
});

