# NoSI (NodeJS Service)

## Security
---
**HTTPS**

Https support is fully intergrated but is missing a certificate <br>
Unity doesn't support self signed certificates so Https is turned off by default.<br>
Enable Https by setting ``UseHttps`` to ``true`` in config.json.<br>
Add the certificates to the root of the project, you should name the files the same they are named in config.json. 

**API Key**

To use the API an API key is required.<br>
This key is defined in APIKEYS.json, the file is not included in the repository for security reasons<br>**YOU WILL HAVE TO ADD THIS YOURSELF!**<br>
Name the file ``APIKEYS.json`` and put in in the root directory.<br>
The file should be structured like this:
```
[
    {
        "key": "<KEY HERE>",
        "role": "Unity"
    }
]
```

## Routes
---
**Base urls:**

Remember to change ``https`` to ``http`` when using HTTP
- Local: ``https://localhost:3000/service``
- Public: ``https://[ip]:3000/service``

**Route descriptions**

| Method | Path | Description |
| -------- | ------ | ------------- |
| GET | /getallhardware?apikey=``APIKEY`` | Returns a list of all hardware in the database |
| GET | /getstate/``name``?apikey=``APIKEY`` | Returns the state of hardware with the name: ``name`` |
| GET | /getactionlog?apikey=``APIKEY`` | Returns the entire actionlog |
| POST | /updatestate?apikey=``APIKEY`` | Changes the state of hardware, exspects the body to be in this format:<br>**name**: Wekker<br>**interaction**: alarm<br>**state**: off |
| POST | /newhardware?apikey=``APIKEY`` | Add hardware to database |


## Deployment
---
The service has two requirements:
- MongoDB
- NodeJS
- (Optional) A frontend

Install and run MongoDB by following [these instructions](https://docs.mongodb.com/manual/installation/)<br>
Clone this repository and run ``npm install``<br>
The database needs to be seeded with some initial hardware.<br>
You can do this by filling the database with actual hardware or use mock hardware.<br>
To fill the database with mock hardware run: ``npm run seed``<br>
Run the server with ``npm start``<br>
You might want to use a system service when using linux.<br>
To include a frontend you first need to build/compile it (when using Angular or React), then put it in ``/public`` <br>
The frontend can be reached by navigating to ``[url]/dashboard`` (when using Angular make sure you set the base url to "/dashboard" instead of "/" before building).
