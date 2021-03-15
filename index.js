const express = require("express");
const bodyparser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const { say } = require("cowsay");

/** Express */
const app = express();
app.disable("x-powered-by");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

/** Mongoose */
require("./config/mongoose.config");

/** Cors */
app.use(cors({
  origin: "*",
  optionsSuccessStatus: 200
}));

/** Routes */
app.use("/api/elastic/persons", require("./routes/elasticsearch/person.route"));
app.use("/api/auth", require("./routes/mongodb/auth.route"));
app.use("/api/users", require("./routes/mongodb/user.route"));

/** Port */
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.info(say({ text: `Server running on port: ${port}.` }));
});