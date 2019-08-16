import  Joi from 'joi';
import {Pool} from 'pg';
import uuid from 'uuid'
import dotenv from "dotenv";
dotenv.config();
const pool = new Pool({connectionString: process.env.DATABASE_URL});

exports.book_a_seat = async(req, res) => {
    const schema = Joi.object().keys({
        bookings_id:Joi.number().required(),
        bus_license_number:Joi.string().required(),
        user_email: Joi.string().email({ minDomainSegments: 2 }).required(),
        first_name: Joi.string().alphanum().min(3).max(30).required(),
        last_name: Joi.string().alphanum().min(3).max(30).required(),
        trip_date:Joi.date().required(),
        is_admin:Joi.boolean().required(),

      });
      const validate_data = Joi.validate(req.body, schema);
      if (validate_data.error) {
        res.status(400).json({
          status: 400,
          error:validate_data.error.details[0].message
        });
     }
     const createbooking = `INSERT INTO
      bookings(booking_id, bus_license_number, user_email, first_name, last_name, trip_date, is_admin)
      VALUES($1, $2, $3, $4, $5 ,$6 , $7)
      returning *`;
    const values = [
      uuid.v4(),
      req.body.bus_license_number,
      req.body.user_email,
      req.body.first_name,
      req.body.last_name,
      req.body.trip_date,
      req.body.is_admin];
      const { rows } = await pool.query(createbooking, values);
      return res.status(201).json({
          status:201,
          data:rows[0]});  
  }
    
  exports.bookings = async(req, res) => {
    const specific_booking = 'SELECT * FROM bookings WHERE booking_id = $1';
    try {
      const { rows } = await pool.query(specific_booking, [req.params.booking_id]);
      if (!rows[0]) {
        return res.status(404).json({
            status: 404,
            error:"booking not found"
        });
      }
      return res.status(200).json({
          status:200,
          data:rows[0]
        });
    } catch(error) {
      return res.status(400).json({
          status:400,
          error:error   
      })
    }
  }

  exports.delete=async(req, res) =>{
    const deletebooking = 'DELETE FROM booking WHERE booking_id=$1 returning *';
    try {
      const { rows } = await pool.query(deletebooking, [req.params.booking_id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'reflection not found'});
      }
    
      return res.status(204).send({ 'message': 'deleted' });
    } catch(error) {
      return res.status(400).send(error);
    }
  }
