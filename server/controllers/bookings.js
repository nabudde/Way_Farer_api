// import  Joi from 'joi';
// import { bookings } from '../routes/models';

// exports.book_a_seat = (req, res) => {
//     const schema = Joi.object().keys({
//         bus_license_number:Joi.string().required(),
//         user_email: Joi.string().email({ minDomainSegments: 2 }).required(),
//         first_name: Joi.string().alphanum().min(3).max(30).required(),
//         last_name: Joi.string().alphanum().min(3).max(30).required(),
//         trip_date:Joi.date().required(),
//         is_admin:Joi.boolean().required(),

//       });
//       const validate_data = Joi.validate(req.body, schema);
//       if (validate_data.error) {
//         res.status(400).json({
//           status: 400,
//           error:validate_data.error.details[0].message
//         });
//       }
//     const { bus_license_number,user_email,first_name,last_name,trip_date,is_admin} = req.body;
//     const booking_id = bookings.length + 1;   
//     const result = {
//         booking_id,
//         bus_license_number, 
//         user_email,
//         first_name,
//         last_name,
//         trip_date,
//         is_admin,
//     };
//     bookings.push(result);
//     res.status(200).json({
//         status: 201,
//         data:{
//           result 
//         }
//     })

//     }


// exports.bookings = (req, res) => {
//     const check_booker = bookings.find(b => b.booking_id == req.params.booking_id);
//     if(!check_booker){
//         return res.status(400).json({
//             status: 400,
//             error:"provided booking_id is not provided"
//         });
//     }
//     if(!check_booker.is_admin){
//         return res.json({
//             status: 201,
//             data: check_booker
//         });
//     }
//     res.json({
//         status: 201,
//         data: bookings
//     });
// }

// exports.delete=(req,res)=>{
//     const delete_booking = bookings.find(b => b.booking_id == req.params.booking_id);
//     if(!delete_booking){
//         return res.status(400).json({
//             status: 400,
//             error:validate_data.error.details[0].message
//         });
//     }     
//         const Index = bookings.indexOf(delete_booking);
//         bookings.splice(Index, 1);
//         res.json({
//             status:201,
//             data:{
//              message:"Booking deleted successfully "
//             }
//     });   
// }
