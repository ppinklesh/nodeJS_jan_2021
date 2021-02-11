const multer = require("multer");
const unstructure = require("../models/unstructure");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/unstructure");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `unstructure${req.params.id}${Date.now()}.${ext}`);
  },
});

const upload = multer({
  storage: multerStorage,
});

exports.unstructurePhoto = upload.single("any");

exports.createUnstructure = async (req, res) => {
  try {
    const newUnstructure = await unstructure.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        event: newUnstructure,
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
exports.getUnstructure = async (req, res) => {
  try {
    const unstructureID = req.params.id;
    const getUnstructure = await unstructure.findById(unstructureID);
    res.status(200).json({
      status: "success",
      data: {
        event: getUnstructure,
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

exports.updateUnstructure = async (req, res) => {
  //   console.log(req.file);
  if (req.file) req.body.any = req.file.filename;

  try {
    const update = await unstructure.findOneAndUpdate(req.params.id, req.body, {
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
      message: "no unstructure data found",
    });
  }
};

exports.deleteUnstructure = async (req, res) => {
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
