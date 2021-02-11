const event = require("./../models/event");
const speaker = require("./../models/speaker");
// creating events
exports.createEvent = async (req, res) => {
  try {
    const newEvent = await event.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        event: newEvent,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

// getting all the events
exports.getAllEvent = async (req, res) => {
  try {
    const events = await event.find();
    if (events.length == 0) {
      return res.status(404).json({
        status: "success",
        data: {
          events: "No event happening",
        },
      });
    }
    res.status(200).json({
      status: "success",
      result: events.length,
      data: {
        events,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

// get one event by id
exports.getEvent = async (req, res) => {
  try {
    const eventID = req.params.id;
    const getEvent = await event
      .findById(eventID)
      .populate("speaker")
      .populate("moderator")
      .populate("moderator");
    res.status(200).json({
      status: "success",
      data: {
        event: getEvent,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: "no event found",
    });
  }
};
// updating event

exports.updateEvent = async (req, res) => {
  try {
    const update = await event.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      status: "success",
      data: {
        event: update,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: "no event found",
    });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await event.findByIdAndDelete(req.params.id);
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
