
const path = require('path');
const express = require('express');
const app = express();
const router = require("./routes/router.js");
const dashboard = require("./routes/dashboard.js");
const graphrouter = require("./routes/graphrouter.js");
const port = 6002;

const helmet = require('helmet');


app.use((req, res, next)=>{
    console.log('Time:', Date.now(), 'Requested URL', req.originalUrl);
    next()
});
app.use(helmet());
app.use('/newdashboard', dashboard);
app.use('/dashboard', express.static(path.join(__dirname + '/public')));
app.use("/service/", router);
app.use("/graph/", graphrouter);
app.get("/", (req, res) => {
    res.send('<head><style>#face{animation: face-color 5s infinite; animation-direction: alternate;}@keyframes face-color {from {color:black;} to {color:Chartreuse}}</style></head><body><h1 id="face">(⊙_☉)</h1></body>');
});

app.listen(port, ()=> console.log(`listening on port ${port}! and using HTTP`));

