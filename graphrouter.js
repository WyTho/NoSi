const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const graphService = require("./services/graphservice.js");

router.use(bodyParser.json()); // for parsing application/json
router.use(cors());
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.get('/voorbeeldroute', (req, res) =>{
    graphService.voorbeeldRoute(req, res);
});

module.exports = router;
