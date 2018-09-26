const database = require("../util/database.js");
const uuid = require("uuid/v4");
const TAG = "Hardware Manager";
const Debugger = require("../util/debug.js");
const Debug = Debugger(TAG);

function hardwaremanager() {
    const databasename = "hardware";
    const hardwarenames = ["Staande_lamp_1",
        "slide-door",
        "VE_Air_Terminal_Wall_Grille_MEPcontent_Trox_SL-DG",
        "VK102",
        "Paneli1_vin",
        "Fire_Alarm-Intelligent_Detector-UTC-Multisensor_Detectors",
        "32_binnendeur[7206040]",
        "Lamp_eettafel[4643785]",
        "Lamp_eettafel[4688990]",
        "Lamp_eettafel[4689006]",
        "arwa_cityplus_basin_faucet[4794141]",
        "Fire_Alarm-Intelligent_Detector-UTC-Multisensor_Detectors [4689",
        "Inperla[4679315]",
        "32_binnendeur[7202788]",
        "Wasmachine",
        "Inperla[4679340]",
        "Inperla[4679360]"];

    function indexof(index) {
        return hardwarenames.indexOf(index);
    }

    return {
        updateState(req, res) {
            if (!req.body || !req.body.name || !req.body.interaction || !req.body.state) {
                return res.send("No Data Found");
            }

            database.find("hardware", {name: req.body.name}).then(result => {
                console.log(result);
                if (result.length === 0) {
                    return res.send("No Data Found");
                }

                result = result[0];

                let interaction = result.interactions.find(x => x.name === req.body.interaction);
                if (!interaction) return res.send("No Interaction Found");
                let action = interaction.actions.find(x => x.code === req.body.state);
                if (!action) return res.send("No action found");

                let date = new Date();

                database.insert("actionlog", {
                    hardwareID: result.id,
                    hardwareName: result.name,
                    date: date.toLocaleString(),
                    interaction: interaction.name,
                    action: action.description,
                    state: action.code
                }, () => Debug("inserted"));

                result.state[0].state = action.code;

                database.update("hardware", {name: req.body.name}, result, x =>  res.send(x));


            }).catch(err => Debug(err));
        },
        updateBase(req, res) {
            console.log(req.body);
            if (!req.body || !req.body.name || !req.body.base || !req.body.type || !req.body.dataset) {
                return res.send("No Data Found");
            }

            Debug(req.body);
            index= indexof(req.body.name);
            querybase= "hardware."+index+".log.0.base64";
            querydata= "hardware."+index+".log.0.type";
            querytype= "hardware."+index+".log.0.dataset";
            console.log(querytype);
            database.update("area", {id: '4'}, {$set: {querybase: req.body.base}});
            database.update("area", {id: '4'}, {$set: {querytype: req.body.type}});
            database.update("area", {id: '4'}, {$set: {querydata: req.body.dataset}});
        },
        testSecurity(req, res) {
            res.send("Response");
            JSON.stringify``
        },

        getState(req, res) {
            if (!req.params.name) {
                return res.send("No Data Found");
            }
            database.find(databasename, {name: req.params.name}).then(result => {
                if (result.length === 0) {
                    return res.send("No Data Found");
                }
                res.send(result);
            }).catch(err => res.send(err));
        },
        getBase(req, res) {
            if (!req.params.name) {
                return res.send("No Data Found");
            }
            database.find(databasename, {hardware: {$elemMatch: {name: req.params.name}}}).then(result => {
                if (result.length === 0) {
                    return res.send("No Data Found");
                }

                res.send(result[0].hardware[indexof(req.params.name)].log[0]);
            });
        },
        newHardware(req, res) {
            if (!req.body.hardware) return res.send("No Data");
            req.body.object.id = uuid();
            database.insert(databasename, req.body.hardware, x => res.send(x));

        },

        getAllHardware(req, res) {
            database.find(databasename, {}).then(result => {
                res.send(JSON.stringify({area: result}));
            }).catch(err => res.send(err));
        }
    };
}


module.exports = hardwaremanager();
