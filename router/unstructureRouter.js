const express = require("express");
const unstructureController = require("../controller/unstructureController");

const router = express.Router();
router.post("/unstructure", unstructureController.createUnstructure);
router.get("/unstructure/:id", unstructureController.getUnstructure);
router.patch(
  "/unstructure/:id",
  unstructureController.unstructurePhoto,
  unstructureController.updateUnstructure,
);
router.delete("/unstructure/:id", unstructureController.deleteUnstructure);

module.exports = router;
