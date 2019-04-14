const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const MONGODB_URI = "YOUR_MONGODB_INSTANCE_URI_HERE";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

app.use(require("./routes"));

app.listen(8888);
