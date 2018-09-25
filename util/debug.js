const Config = require("../config.json");

function Debugger(tag){

    return function(msg) {
        if(Config.runmode.toLowerCase() === "debug") console.log(`${tag}: ${msg}`);
    }
}

module.exports = Debugger;