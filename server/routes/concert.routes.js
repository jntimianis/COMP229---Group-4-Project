import express from "express";
import concertCtrl from "../controllers/concert.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/api/concerts").post(concertCtrl.create);

router.route("/api/concerts").get(concertCtrl.list);

router
  .route("/api/concerts/:concertId")
  .get(authCtrl.requireSignin, concertCtrl.read)
  .put(authCtrl.requireSignin, concertCtrl.update)
  .delete(authCtrl.requireSignin, concertCtrl.remove);

router
  .route("/api/concerts/:concertId/rating")
  .put(authCtrl.requireSignin, concertCtrl.updateRating);
router.param("concertId", concertCtrl.concertByID);

export default router;
