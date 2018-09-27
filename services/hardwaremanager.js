const database = require("../util/database.js");
const uuid = require("uuid/v4");

const noDataMsg = "No Data Found";
const databasename = "area";
const hardwarenames = [
    "Staande_lamp_1",
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
    "Inperla[4679360]"
];

module.exports = {
    updateState(req, res) {
        if (!req.body || !req.body.name || !req.body.interaction || !req.body.state) {
            return res.send("No Data Found!");
        }
        database.getAllHardware().then(hw => {
            const {hardware: hardwareList} = hw;
            const hardware = [...hardwareList].filter(h => h.name === req.body.name)[0];
            if(!hardware) return res.send("No Data Found");
            console.log(hardware);

            let interaction = hardware.interactions.find(x => x.name === req.body.interaction);
            if (!interaction) return res.send("No Interaction Found");
            let action = interaction.actions.find(x => x.code === req.body.state);
            if (!action) return res.send("No action found");

            database.insert("actionlog", {
                hardwareID: hardware.id,
                hardwareName: hardware.name,
                date: new Date().toLocaleString(),
                interaction: interaction.name,
                action: action.description,
                state: action.code
            }, () => console.log("inserted"));

            hardware.state.code = action.code;
            console.log("going to update");
            database.update(databasename, {areaname: "keuken"}, hw, x => res.send(x));


        }).catch(err => console.log(err));
    },
    updateBase(req, res) {
        if (!req.body || !req.body.name || !req.body.base || !req.body.type || !req.body.dataset) {
            return res.send(noDataMsg);
        }
        database.update(databasename, {id: '4'}, {$set: {querybase: req.body.base}});
        database.update(databasename, {id: '4'}, {$set: {querytype: req.body.type}});
        database.update(databasename, {id: '4'}, {$set: {querydata: req.body.dataset}});
    },
    testSecurity(req, res) {
        res.send("Response");
        JSON.stringify``
    },

    getState(req, res) {
        if (!req.params.name) return res.send(noDataMsg);

        database.find(databasename, {name: req.params.name})
            .then(result => result.length === 0 ? res.send(noDataMsg) : res.send(result))
            .catch(err => res.send(err));
    },
    getBase(req, res) {
        if (!req.params.name) return res.send(noDataMsg);
        database.find(databasename, {hardware: {$elemMatch: {name: req.params.name}}})
            .then(result =>
                result.length === 0 ?
                    res.send(noDataMsg) :
                    res.send(result[0].hardware[hardwarenames.indexOf(req.params.name)].log[0])
            );
    },
    newHardware(req, res) {
        if (!req.body.hardware) return res.send(noDataMsg);
        req.body.object.id = uuid();
        database.insert(databasename, req.body.hardware, x => res.send(x));

    },

    getAllHardware(req, res) {
        database.find(databasename, {})
            .then(result => res.send(JSON.stringify({area: result})))
            .catch(err => res.send(err));
    }
};
