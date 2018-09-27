
module.exports = {
    voorbeeldRoute: (req, res) => {
        const vraag = req.query.vraag;
        res.send(vraag);
    }
};
