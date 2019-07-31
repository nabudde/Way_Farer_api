const Joi =require ("joi");
const { trips } = require('../models');

exports.trips = (req, res) => {
    const schema = Joi.object().keys({
        seating_capacity: Joi.number().required(),
        bus_license_number: Joi.number().required(),
        origin: Joi.string().alphanum().required(),
        trip_date:Joi.date().required(),
        destination: Joi.string().alphanum().required(),
        fare: Joi.number().required()
      });
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        res.status(400).send(result.error.details[0].message);
      }
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

  return res.status(200).json({
    status: "success",
    data: createTrip
  });
};


exports.alltrips = (req, res) => {
  res.json({
    status: "success",
    data: trips
});
}
