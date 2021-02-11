const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const Mongoose = require("mongoose");
const port = process.env.PORT || 3000;

// mongo database connection
Mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log(`database connected`);
  })
  .catch((err) => {
    console.log(`database connection failed`, err);
  });

//   start server
app.listen(port, () => {
  console.log(`server is running ${port}`);
});
