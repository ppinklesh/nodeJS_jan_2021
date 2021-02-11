const express = require("express");
const speakerController = require("./../controller/speakerController");

const router = express.Router();
router.post("/speaker", speakerController.createSpeaker);
router.get("/speaker/:id", speakerController.getSpeaker);
router.patch(
  "/speaker/:id",
  speakerController.speakerPhoto,
  speakerController.updateSpeaker,
);
router.delete("/speaker/:id", speakerController.deleteSpeaker);

module.exports = router;
