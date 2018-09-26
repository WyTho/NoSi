
// AANGEPAST: mongo credentials @ config.json
// AANGEPAST: APIKEYS.json toegevoegd (word niet gebruikt volgensmij)

var fs = require('fs');
var https = require('https');
var path = require('path');
const Config = require('./config.json');
const express = require('express');
const app = express();
const router = require("./router.js");
const dashboard = require("./dashboard.js");
const graphrouter = require("./graphrouter.js");
const port = 80;
var helmet = require('helmet');

app.use(helmet());
app.use('/newdashboard', dashboard);
app.use('/dashboard', express.static(path.join(__dirname + '/public')));
app.use("/service/", router);
app.use("/graph/", graphrouter);
app.get("/", (req, res) => {
    res.send('<head><style>#face{animation: face-color 5s infinite; animation-direction: alternate;}@keyframes face-color {from {color:black;} to {color:Chartreuse}}</style></head><body><h1 id="face">(⊙_☉)</h1></body>');
});

//Options for HTTPS
const options = {
    //key: fs.readFileSync(`./${Config.HttpCertificateFileName}.pem', 'utf8`),
    //cert: fs.readFileSync(`./${Config.HttpCertificateFileName}.crt', 'utf8`)
};

//Check config.json if it should run on HTTPS or HTTP.
/*if(Config.UseHttps){
//    https.createServer(options, app).listen(port);
//    console.log(`listening on port ${port}! and using HTTPS`)
}
else {*/
// AANGEPAST: port var = gefixt
app.listen(port, ()=> console.log(`listening on port ${port}! and using HTTP`));
//}
