const { bookings } = require('../models');
exports.bookings = (req, res) => {
    res.json({
        status: "success",
        data: bookings
    });
}
