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
    ];
    const { rows } = await pool.query(text, values);
    return res.status(201).send(rows[0]);
  }
  exports.alltrips = async(req, res) => {
    const all_trips = 'SELECT * FROM trips';
    try {
      const { rows, rowCount } = await pool.query(all_trips);
      return res.status(200).send({ rows, rowCount });
    } catch(error) {
      return res.status(400).send(error);
    } 
  }
  exports.specific_trip = async(req, res) => {
    const specific_trip = 'SELECT * FROM trips WHERE trip_id = $1';
    try {
      const { rows } = await pool.query(specific_trip, [req.params.trip_id]);
      if (!rows[0]) {
        return res.status(404).send({'message': 'trip not found'});
      }
      return res.status(200).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error)
    }
  }
  exports.cancel_trip = async(req, res) => {
    const isExistingTrip = 'SELECT * FROM trips WHERE trip_id = $1';
    try {
      const { rows } = await pool.query(isExistingTrip, [req.params.trip_id]);
      if (!rows[0]) {
        return res.status(404).send({'message': 'trip not found'});
      }
    } catch(error) {1
    }

      const canceltrip= `UPDATE trips SET status = 'cancelled'  WHERE trip_id = $1 returning *;`;
      const newId = req.params.trip_id;
      try {
        const { rows } = await pool.query(canceltrip, [newId]);
        return res.status(404).send({"data": rows[0]});
      } catch (error) {
        return error;
      }
    };
  

  
  
