const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

require("./models/userSchema.js");

app.use(cors());

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log(
  `${mongoose.connection.readyState}-connected to database sucessfully with value of 2`
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/userRoute")(app);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
