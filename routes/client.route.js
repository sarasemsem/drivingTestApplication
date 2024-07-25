const express = require("express");
const Client = require("../models/client.model.js");
const router = express.Router();
const {getClients, getClient, createClient, updateClient, deleteClient} = require('../controllers/client.controller.js');


router.get('/', getClients);
router.get("/:id", getClient);

router.post("/", createClient);

// update a client
router.put("/:id", updateClient);

// delete a client
router.delete("/:id", deleteClient);

module.exports = router;