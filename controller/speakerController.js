const multer = require("multer");
const speaker = require("./../models/speaker");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/speaker");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `speaker${req.params.id}${Date.now()}.${ext}`);
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

exports.speakerPhoto = upload.single("photo");

exports.createSpeaker = async (req, res) => {
  try {
    const newSpeaker = await speaker.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        event: newSpeaker,
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
exports.getSpeaker = async (req, res) => {
  try {
    const speakerID = req.params.id;
    const getSpeaker = await speaker.findById(speakerID);
    res.status(200).json({
      status: "success",
      data: {
        event: getSpeaker,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: "no speaker found",
    });
  }
};
// updating event

exports.updateSpeaker = async (req, res) => {
  //   console.log(req.file);
  if (req.file) req.body.photo = req.file.filename;

  try {
    const update = await speaker.findOneAndUpdate(req.params.id, req.body, {
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
      message: "no speaker found",
    });
  }
};

exports.deleteSpeaker = async (req, res) => {
  try {
    await speaker.findByIdAndDelete(req.params.id);
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
