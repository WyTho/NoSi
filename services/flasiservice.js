const db = require('../util/database');
const config = require('../config.json');
const fetch = require('node-fetch');
function flasiService(){
    
    const queryURL = config.FlaSi.urlbase + "/query/execute";

    return {
        
        sync(req, res) {
            //Vraagt nieuwe data op uit FlaSi, stopt de data in MongoDB.

            //TODO: tijd aan geven vanaf waar gesynct moet worden
            //TODO: Sql bepalen en vervangen voor de temp sql
            
            const tempSqlQuery = "select * from aankoop limit 50";

            let body = JSON.stringify([{
                name: "query",
                type: "mysql-query",
                example: "",
                value: tempSqlQuery
            }])
            fetch(queryURL, { method: 'POST', body: body })
                .then(data => data.json())
                .then(data => {

                    /*
                        Het result zit in data,
                        Sla de data op een slimme manier op in de database.

                        Op dit moment wordt de data alleen gestuurt in de response
                    */

                    res.send(JSON.stringify(data));

                }).catch(err => res.sendStatus(500));
        },

        /*
            sendStateChange wordt gebruikt om de hardware in het ECHTE huis aan en uit te zetten!
            Pas dit niet zomaar aan!
        */
        sendStateChange(id, interaction, state){
            //Verzend nieuwe state naar FlaSi.

            //Bijv. http://192.168.1.100:8080/domotica/0?state=1
            const url = `${config.FlaSi.urlbase}/domotica/${id}?state=${state}`
            
            fetch(url,{method: 'POST'})
                .then(data => data.json())
                .then(data => {
                    //Doe iets
                    console.log(data);
                }).catch(err => {
                    console.log(err);
                });

        }
    }
}

module.exports = flasiService();