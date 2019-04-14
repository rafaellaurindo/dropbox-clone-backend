const express = require("express");
const mongoose = require("mongoose");

const app = express();
const MONGODB_URI = "YOUR_MONGODB_INSTANCE_URI_HERE";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(require("./routes"));

app.listen(8888);
