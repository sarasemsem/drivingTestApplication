const express = require("express");
const Client = require("../models/client.model.js");
const router = express.Router();
const {getClients,getClientToTest,updateScore, getClient, createClient, updateClient, deleteClient} = require('../controllers/client.controller.js');


// Get all clients
router.get('/', getClients);

// Get a specific client by ID
router.get("/:id", getClient);

// Get a client to test 
router.get("/test/data", getClientToTest);

// Update a client's score (make this route more specific as well)
router.put("/test/updateScore/:id", updateScore);

// Create a new client
router.post("/", createClient);

// Update a client
router.put("/:id", updateClient);

// Delete a client
router.delete("/:id", deleteClient);

module.exports = router;