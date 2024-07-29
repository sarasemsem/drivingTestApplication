const express = require("express");
const User = require("../models/user.model.js");
const router = express.Router();
const {createUser,getUser,deleteUser,updateUser,getUsers} = require('../controllers/user.controller.js');


router.get('/', getUsers);
router.get("/:id", getUser);

router.post("/", createUser);

// update a user
router.put("/:id", updateUser);

// delete a user
router.delete("/:id", deleteUser);

module.exports = router;