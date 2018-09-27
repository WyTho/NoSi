const database = require("../util/database.js");
const hardwaretemplate = require("../backup3.json");
const TAG = "DBSEED";
const Debugger = require("../util/debug.js");
const Debug = Debugger(TAG); 
/*
    This file is for seeding the initial database, only run this once!
*/
// GEDAAN: dit is uitgevoerd om de mongoDB te vullen
// hardwaretemplate.forEach(x => {
//     database.insert("area", x, () => Debug(`Inserted: ${x.name}`));
// });

database.insert("area", hardwaretemplate, () => Debug(`Inserted!`));

