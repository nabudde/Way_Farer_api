const { trips } = require('../models');


exports.cancel_trip=(req,res)=>{
    const cancel_trip = trips.find(t => t.trip_id == req.params.trip_id);
    if(!cancel_trip){
        return res.status(400).json({
            status: 400,
            error:"provided trip_id is not available "
        });    
        };
    res.json({
        status : 200,
        data : {
            message : "Trip cancelled successfully",
        }
    });
    
}