
function graphService(){
  return {
    voorbeeldRoute(req, res){
      const vraag = req.query.vraag;
      res.send(vraag);
    }
  };
}

module.exports = graphService();
