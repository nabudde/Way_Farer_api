import {Router} from 'express';
import { signin, signup } from '../../controllers/user';
import { trips, alltrips ,specific_trip ,cancel_trip } from '../../controllers/trips';
import { book_a_seat ,bookings } from '../../controllers/bookings';




const router = Router();
router.post('/auth/signup', signup);
router.post('/auth/signin', signin);

router.post('/trips',trips);
router.get('/trips' ,alltrips);
router.get('/trips/:trip_id', specific_trip);
router.patch('/trips/cancel/:trip_id',cancel_trip);

router.post('/bookings',book_a_seat);
router.get('/bookings/:booking_id',bookings);
router.delete('/bookings/delete/:booking_id',bookings);


  module.exports = router;
