const { trips } = require('../models');
exports.specific_trip = (req, res) => {
    const specific_trip = trips.find(t => t.trip_id == req.params.trip_id);
    if(!specific_trip){
        return res.status(400).send("entered trip_id is not available");      
        };
    res.json({
        status : "success",
        data : {
            specific_trip
        }
    });
    
}
