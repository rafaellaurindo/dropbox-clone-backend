const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const http = require("http");
const socket = require("socket.io");

const app = express();
const MONGODB_URI = "YOUR_MONGODB_INSTANCE_URI_HERE";

const server = http.Server(app);
const io = socket(server);

io.on("connection", socket => {
  socket.on("connectRoom", box => {
    socket.join(box);
  });
});

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

app.use(require("./routes"));

server.listen(8888);
