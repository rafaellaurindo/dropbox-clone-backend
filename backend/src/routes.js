const express = require("express");

const routes = express.Router();

const BoxController = require("./controllers/BoxControler");

routes.post("/boxes", BoxController.store);

module.exports = routes;
