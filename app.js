const express = require("express");
const app = express();
const morgan = require("morgan");
const eventRouter = require("./router/eventRouter");
const speakerRouter = require("./router/speakerRoute");
const moderatorRouter = require("./router/moderatorRouter");
const unstructureRouter = require("./router/unstructureRouter");

app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1", eventRouter);
app.use("/api/v1", speakerRouter);
app.use("/api/v1", moderatorRouter);
app.use("/api/v1", unstructureRouter);

module.exports = app;
