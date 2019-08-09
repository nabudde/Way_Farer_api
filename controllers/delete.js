const { bookings } = require('../models');


exports.delete=(req,res)=>{
    const delete_booking = bookings.find(b => b.booking_id == req.params.booking_id);
    if(!delete_booking){
        return res.status(400).json({
            status: 400,
            error:validate_data.error.details[0].message
        });
    }     
        const Index = bookings.indexOf(delete_booking);
        bookings.splice(Index, 1);
        res.json({
            status:201,
            data:{
             message:"Booking deleted successfully "
            }
    });   
}