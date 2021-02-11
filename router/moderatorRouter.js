const express = require("express");
const moderatorController = require("./../controller/moderatorController");

const router = express.Router();
router.post("/moderator", moderatorController.createModerator);
router.get("/moderator/:id", moderatorController.getModerator);
router.patch(
  "/moderator/:id",
  moderatorController.moderatorPhoto,
  moderatorController.updateModerator,
);
router.delete("/moderator/:id", moderatorController.deleteModerator);

module.exports = router;
