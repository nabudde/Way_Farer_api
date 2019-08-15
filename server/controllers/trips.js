import Joi from"joi";
import uuid from 'uuid';
import {Pool} from 'pg';
import dotenv from "dotenv";
dotenv.config();
const pool = new Pool({connectionString: process.env.DATABASE_URL});

exports.trips = async(req, res) => {
    const schema = Joi.object().keys({
        trip_id:Joi.number().required(),
        seating_capacity: Joi.number().required(),
        bus_license_number: Joi.number().required(),
        origin: Joi.string().alphanum().required(),
        trip_date:Joi.date().required(),
        date_created:Joi.date().required(),
        destination: Joi.string().alphanum().required(),
        fare: Joi.number().required()
      });
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        res.status(400).json({
            status: 400,
            error:result.error.details[0].message
        });
      }
  
    const text = `INSERT INTO
      trips(trip_id, seating_capacity, bus_license_number, 
        origin, destination, date_created, trip_date, fare)
      VALUES($1, $2, $3, $4, $5 ,$6 ,$7,$8 )
      returning *`;
    const values = [
      uuid.v4(),
      req.body.seating_capacity,
      req.body.bus_license_number,
      req.body.origin,
      req.body.destination,
      req.body.date_created,
      req.body.trip_date,
      req.body.fare,
      // req.body.status
    ];
    const { rows } = await pool.query(text, values);
    return res.status(201).send(rows[0]);
  } 
//       if(users_status.is_admin===false){
//         return res.status(400).json({
//           status: 400,
//           error:"not eligible to create a trip"
//       })
//         };
//   const trip_id = trips.length + 1;
//   const date_created= new Date();
//   const {
//     seating_capacity,
//     bus_license_number,
//     origin,
//     trip_date,
//     destination,
//     fare
//   } = req.body;
  
//   const createTrip = { 
//     trip_id,
//     seating_capacity,
//     bus_license_number,
//     origin,
//     destination,
//     date_created,
//     trip_date,
//     fare
//   };
//   trips.push(createTrip);
//   res.status(201).json({
//     status: 201,
//     data:{ 
//       createTrip
//     }
//   });
// }
  


// exports.alltrips = (req, res) => {
//   res.json({
//     status: 200,
//     data: trips
// });
// }

// exports.specific_trip = (req, res) => {
//   const specific_trip = trips.find(t => t.trip_id == req.params.trip_id);
//   if(!specific_trip){
//       return res.status(400).json({
//           status: 400,
//           error:"provided id is not available"
//       })      
//       };
//   res.json({
//       status : 200,
//       data : {
//           specific_trip
//       }
//   });
  
// }


// exports.cancel_trip=(req,res) =>{
//   const cancel_trip = users.users.trips.find(t => t.trip_id == req.params.trip_id);
//   if(!cancel_trip){
//       return res.status(400).json({
//           status: 400,
//           error:"provided trip_id is not available "
//       });    
//   };
//   res.json({
//       status : 200,
//       data : {
//           message : "Trip cancelled successfully",
//       }
//   })
// }