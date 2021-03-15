const mongoose = require("mongoose");
const { say } = require("cowsay");

/** MongoDB */
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => console.info(say({ text: "Connected to MongoDB." })))
  .catch(error => console.error("Connection failed to MongoDB: ", error.message));