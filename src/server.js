const cors = require("cors");
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const path = require("path");
const socket = require("socket.io");

const app = express();
app.use(cors());

const MONGODB_URI = process.env.MONGODB_URI;

const server = http.Server(app);
const io = socket(server);

io.on("connection", socket => {
  socket.on("connectRoom", box => {
    socket.join(box);
  });
});

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.use((req, res, next) => {
  req.io = io;

  return next();
});
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

app.use(require("./routes"));

server.listen(process.env.PORT || 8888);
