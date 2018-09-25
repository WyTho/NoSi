const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const config = require("./config.json");
const multer = require('multer'); // v1.0.5
const upload = multer(); // for parsing multipart/form-data
const cors = require('cors');
//const APIKeys = require("./APIKEYS.json");
const graphService = require("./services/graphservice.js");

//Create a Debugger
const TAG = "Graph Router"
const Debugger = require("./util/debug.js");
const Debug = Debugger(TAG);

router.use(bodyParser.json()); // for parsing application/json
router.use(cors());
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//Register API key validation as middleware for all '/service' routes
//router.use(validateAPIKey);

/*
    Hier worden routes gelinkt aan functions in graphservice.js
*/

//Registreer een get route, in dit geval voorbeeldroute
//De url hiervan is dan [url]/graph/voorbeeldroute
router.get('/voorbeeldroute', (req, res) =>{
    graphService.voorbeeldRoute(req, res);
});

function validateAPIKey(req, res, next){
    //Valideer API key, Key object heeft een role die gebruikt kan worden om dingen af te schermen (Wordt nu nog niet gebruikt)
    Debug("Validating");
    if(!req.query.apikey) return res.sendStatus(401);
    if(!APIKeys.some(k => k.key === req.query.apikey)) res.sendStatus(401);
    
    next();
}

module.exports = router;
