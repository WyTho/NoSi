const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const hardwaremanager = require('../services/hardwaremanager.js');
const cors = require('cors');
const flasiservice = require('../services/flasiservice.js');

router.use(bodyParser.json());
router.use(cors());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', function (req, res) {
  res.send('Oh hallo, wat dou jij nou hier?');
});

router.post('/updatestate', upload.array(), function (req, res) {

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

module.exports = router;
