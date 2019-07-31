const router = require('express').Router();
const middleware=require('../middleware');
const signupController = require('../controllers/signup');
const signinController=require('../controllers/signin');
const create_tripController=require('../controllers/trips');
const alltripController=require('../controllers/trips');
const cancel_tripController=require('../controllers/cancel_trip');


router.route('/auth/signup').post(signupController.signup);
router.route('/auth/signin').post(signinController.signin);
router.route('/trips').post(middleware.token_verification,create_tripController.trips);
router.route('/trips').get(alltripController.alltrips);
router.route('/trips/:trip_id/cancel').patch(middleware.token_verification,cancel_tripController.cancel_trip);



module.exports = router;



