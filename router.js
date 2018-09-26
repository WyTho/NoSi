const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const config = require("./config.json");
const Debug = require("./util/debug.js");
const APIKeys = require("./APIKEYS.json");
const multer = require('multer'); // v1.0.5
const upload = multer(); // for parsing multipart/form-data
const hardwaremanager = require('./services/hardwaremanager.js');
const cors = require('cors');
const flasiservice = require('./services/flasiservice.js');

const TAG = "Router";

router.use(bodyParser.json()); // for parsing application/json
router.use(cors());
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

//Register API key validation as middleware for all '/service' routes
//router.use(validateAPIKey);

router.get('/', function (req, res) {
  res.send('Oh hallo, wat dou jij nou hier?');
});

router.post('/updatestate', upload.array(), function (req, res) {
    console.log('-', req, res);
    console.log('UPDATE STATE CALLED');
    hardwaremanager.updateState(req, res);
});
router.post('/updatebase', upload.array(), function (req, res) {
    hardwaremanager.updateBase(req, res);
});
router.get('/getstate/:name', upload.array(), function (req, res) {
    hardwaremanager.getState(req, res);
});
router.get('/getbase/:name', upload.array(), function (req, res) {
    hardwaremanager.getBase(req, res);
});
router.get('/getallhardware', upload.array(), function(req, res){
    Debug('\nhere1\n')
    hardwaremanager.getAllHardware(req, res);
});
router.get('/getactionlog', upload.array(), function(req, res){
    hardwaremanager.getActionLog(req, res);
});
router.post('/new', upload.array(), function(req, res){
    hardwaremanager.newHardware(req, res);
});
router.get('/test', upload.array(), function(req, res){
    hardwaremanager.testSecurity(req, res);
});


router.get('/testflasi', upload.array(), (req, res) => {
    flasiservice.sendStateChange(0,0,1);
    res.sendStatus(200);
});

function validateAPIKey(req, res, next){
    //Valideer API key, Key object heeft een role die gebruikt kan worden om dingen af te schermen (Wordt nu nog niet gebruikt)
    console.log(TAG, "Validating");
  //  console.log(TAG, res.query.apikey);

    if(!req.query.apikey) return res.sendStatus(401);
    if(!APIKeys.some(k => k.key === req.query.apikey)) res.sendStatus(401);

    next();
}
module.exports = router;
