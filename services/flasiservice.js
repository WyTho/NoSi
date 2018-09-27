const config = require('../config.json');
const fetch = require('node-fetch');
function flasiService(){
    const queryURL = config.FlaSi.urlbase + "/query/execute";
    return {
        sync(req, res) {
            const tempSqlQuery = "select * from aankoop limit 50";
            let body = JSON.stringify([{
                name: "query",
                type: "mysql-query",
                example: "",
                value: tempSqlQuery
            }]);
            fetch(queryURL, { method: 'POST', body: body })
                .then(data => data.json())
                .then(data => res.send(JSON.stringify(data)))
                .catch(err => res.sendStatus(500));
        },

        sendStateChange(id, interaction, state){
            const url = `${config.FlaSi.urlbase}/domotica/${id}?state=${state}`;
            
            fetch(url, {method: 'POST'})
                .then(data => data.json())
                .then(data => console.log(data))
                .catch(err => console.log(err));

        }
    }
}

module.exports = flasiService();