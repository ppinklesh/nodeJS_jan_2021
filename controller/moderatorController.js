const multer = require("multer");
const moderator = require("./../models/moderator");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/moderator");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `moderator${req.params.id}${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("err occured", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.moderatorPhoto = upload.single("photo");

exports.createModerator = async (req, res) => {
  try {
    const newModerator = await moderator.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        event: newModerator,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

// get speaker by id
exports.getModerator = async (req, res) => {
  try {
    const moderatorID = req.params.id;
    const getModerator = await moderator.findById(moderatorID);
    res.status(200).json({
      status: "success",
      data: {
        event: getModerator,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: "no moderator found",
    });
  }
};
// updating event

exports.updateModerator = async (req, res) => {
  //   console.log(req.file);
  if (req.file) req.body.photo = req.file.filename;

  try {
    const update = await moderator.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    console.log(req.photo),
      res.status(200).json({
        status: "success",
        data: {
          event: update,
        },
      });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: "no moderator found",
    });
  }
};

exports.deleteModerator = async (req, res) => {
  try {
    await moderator.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "faild",
      message: err,
    });
  }
};
