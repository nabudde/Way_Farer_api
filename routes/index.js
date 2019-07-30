const router = require('express').Router();
const middleware=require('../middleware');
const signupController = require('../controllers/signup');
const signinController=require('../controllers/signin');
const create_tripController=require('../controllers/trips');
const alltripController=require('../controllers/trips');


router.route('/auth/signup').post(signupController.signup);
router.route('/auth/signin').post(signinController.signin);
router.route('/trips').post(middleware.token_verification,create_tripController.trips);
router.route('/trips').get(alltripController.alltrips);


module.exports = router;



