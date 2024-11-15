import Concert from "../models/concert.model.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";
const create = async (req, res) => {
  const concert = new Concert(req.body);
  try {
    await concert.save();
    return res.status(200).json({
      message: "Concert successfully created!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  try {
    let concerts = await Concert.find().select(
      "name date venue location description rating pic"
    );
    res.json(concerts);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const concertByID = async (req, res, next, id) => {
  try {
    let concert = await Concert.findById(id);
    if (!concert)
      return res.status(400).json({
        error: "Concert not found",
      });
    req.profile = concert;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve concert",
    });
  }
};

const read = (req, res) => {
  return res.json(req.profile);
};

const update = async (req, res) => {
  try {
    let concert = req.profile;
    concert = extend(concert, req.body);
    concert.updated = Date.now();
    await concert.save();
    res.json(concert);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let concert = req.profile;
    let deletedConcert = await concert.deleteOne();
    res.json(deletedConcert);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const updateRating = async (req, res) => {
  try {
    let concert = await Concert.findById(req.params.concertId);
    if (!concert) return res.status(400).json({ error: "Concert not found" });

    concert.rating = req.body.rating; // Set the new rating
    await concert.save();
    res.json(concert);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

export default {
  create,
  concertByID,
  read,
  list,
  remove,
  update,
  updateRating,
};
