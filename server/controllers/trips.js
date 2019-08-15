import Joi from"joi";
import{ trips } from'../models';
import { users_status } from '../models';


exports.trips = (req, res) => {
    const schema = Joi.object().keys({
        seating_capacity: Joi.number().required(),
        bus_license_number: Joi.number().required(),
        origin: Joi.string().alphanum().required(),
        trip_date:Joi.date().required(),
        destination: Joi.string().alphanum().required(),
        fare: Joi.number().required(),
      
      });
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        res.status(400).json({
            status: 400,
            error:validate_data.error.details[0].message
        });
      }
      if(users_status.is_admin===false){
        return res.status(400).json({
          status: 400,
          error:"not eligible to create a trip"
      })
        };
  const trip_id = trips.length + 1;
  const date_created= new Date();
  const {
    seating_capacity,
    bus_license_number,
    origin,
    trip_date,
    destination,
    fare
  } = req.body;
  
  const createTrip = { 
    trip_id,
    seating_capacity,
    bus_license_number,
    origin,
    destination,
    date_created,
    trip_date,
    fare
  };
  trips.push(createTrip);
  res.status(201).json({
    status: 201,
    data:{ 
      createTrip
    }
  });
}
  


exports.alltrips = (req, res) => {
  res.json({
    status: 200,
    data: trips
});
}

exports.specific_trip = (req, res) => {
  const specific_trip = trips.find(t => t.trip_id == req.params.trip_id);
  if(!specific_trip){
      return res.status(400).json({
          status: 400,
          error:"provided id is not available"
      })      
      };
  res.json({
      status : 200,
      data : {
          specific_trip
      }
  });
  
}


exports.cancel_trip=(req,res) =>{
  const cancel_trip = users.users.trips.find(t => t.trip_id == req.params.trip_id);
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
  })
}