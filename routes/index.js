const router = require('express').Router();
const middleware=require('../middleware');
const signupController = require('../controllers/signup');
const signinController=require('../controllers/signin');
const create_tripController=require('../controllers/trips');
const alltripController=require('../controllers/trips');
const cancel_tripController=require('../controllers/cancel_trip');
const specific_tripController=require('../controllers/specific_trip');
const book_a_seatController=require('../controllers/book_a_seat');





router.route('/auth/signup').post(signupController.signup);
router.route('/auth/signin').post(signinController.signin);
router.route('/trips').post(middleware.token_verification,create_tripController.trips);
router.route('/trips').get(middleware.token_verification,alltripController.alltrips);
router.route('/trips/:trip_id/cancel').patch(middleware.token_verification,cancel_tripController.cancel_trip);
router.route('/trips/:trip_id').get(middleware.token_verification,specific_tripController.specific_trip);
router.route('/bookings').post(middleware.token_verification,book_a_seatController.book_a_seat);








module.exports = router;
