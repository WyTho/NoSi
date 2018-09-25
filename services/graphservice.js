/*
  Beschrijving
*/

// De functie returnd een object ()

// function getData(){
//       // this is only a setup and doesn't necessarily work rigth now, this needs to be finished
//       // documentation for this can be found on: 
//       // https://www.fusioncharts.com/dev/using-with-server-side-languages/tutorials/creating-interactive-charts-using-node-express-and-mongodb.html
//       // use the find() API and pass an empty query object to retrieve all records
      
//       dbObject.collection("collectioName").find({}).toArray(function(err, docs){
//         if ( err ) throw err;
//         var dateArray = [];
//         var amountPerDayArray = [];
//         var hardwareIDArray = [];
     
//         for ( index in docs){
//           var doc = docs[index];

//           //category array
//           var date = doc['date'];

//           //series 1 values array
//           var activated = doc['activated'];

//           //series 2 values array
//           var hardwareId = doc['hardwareId'];

//           dateArray.push({"label": date});
//           amountPerDayArray.push({"value" : activated});
//           hardwareIDArray.push({"value" : hardwareId});
//         }
     
// //         var dataset = [
// //           {
// //             "seriesname" : "AmountperDay",
// //             "data" : amountPerDayArray
// //           },
// //           {
// //             "seriesname" : "HardwareID",
// //             "data": dateArray
// //           }
// //         ];
     
//         var response = {
//           "dataset" : dataset,
//           "categories" : dateArray
//         };
//       });
//     }

// // ajax method to get the data from MongoDB
// var chartData;
// $(function(){
//   $.AJAX({
//     url: 'http://localhost:3300/hardware', // not the correct URL
//     type: 'GET',
//     success : function(data) {
//       chartData = data;
//       console.log(data);
//     }
//   });
// });

//BUILDING THE GRAPH ITSELF

// var chartProperties = {
//     "caption": "Variation of activations of the lamp",
//     "numberprefix": "Rs",
//     "xAxisName": "Dates",
//     "yAxisName": "Amount of activations "
// };


// var categoriesArray = [{
//       "category" : data["categories"]
// }];


// var lineChart = new FusionCharts({
//     type: 'msline',
//     renderAt: 'chart-location',
//     width: '100Ω',
//     height: '600',
//     dataFormat: 'json',
//     dataSource: {
//         chart: chartProperties,
//         categories : categoriesArray,
//         dataset : data["dataset"]
//     }
// });

// lineChart.render();

function graphService(){

  return {

    voorbeeldRoute(req, res){
      /*
      req is de request, https://expressjs.com/en/4x/api.html#req
      res is de response, https://expressjs.com/en/4x/api.html#res

      Als je naar 'https://localhost:3000/services/graphservice/voorbeeld?vraag=WhyHelloDidntSeeYouThere'
      Zou dit je response moeten zijn:
      > WhyHelloDidntSeeYouThere
      */




      const vraag = req.query.vraag;
      res.send(vraag);

    }
  };
}

module.exports = graphService();
