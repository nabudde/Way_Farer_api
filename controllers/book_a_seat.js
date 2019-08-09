const Joi =require ("joi");
const { bookings } = require('../models');
exports.book_a_seat = (req, res) => {
    const schema = Joi.object().keys({
        bus_license_number:Joi.string().required(),
        user_email: Joi.string().regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).required(),
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
    const { bus_license_number,user_email,first_name,last_name,trip_date,is_admin} = req.body;
    const booking_id = bookings.length + 1;   
    const result = {
        booking_id,
        bus_license_number, 
        user_email,
        first_name,
        last_name,
        trip_date,
        is_admin,
    };
    bookings.push(result);
    res.status(200).json({
        status: 201,
        data:{
          result 
        }
    })

    }