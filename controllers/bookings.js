const { bookings } = require('../models');
exports.bookings = (req, res) => {
    const check_booker = bookings.find(b => b.booking_id == req.params.booking_id);
    if(!check_booker){
        return res.status(400).json({
            status: 400,
            error:"provided booking_id is not provided"
        });
    }
    if(!check_booker.is_admin){
        return res.json({
            status: "success",
            data: check_booker
        });
    }
    res.json({
        status: "success",
        data: bookings
    });
}
