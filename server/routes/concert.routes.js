import express from 'express';
import concertCtrl from '../controllers/concert.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

router.route('/api/concerts').post(authCtrl.requireSignin, concertCtrl.create);

router.route('/api/concerts').get(concertCtrl.list);

router.param('concertId', concertCtrl.concertByID);

router.route('/api/concerts/:concertId')
  .get(concertCtrl.read)
  .put(authCtrl.requireSignin, concertCtrl.update)
  .delete(authCtrl.requireSignin, concertCtrl.remove);

export default router;