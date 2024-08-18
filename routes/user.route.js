const express = require("express");
const User = require("../models/user.model.js");
const router = express.Router();
const {createUser,getUser,deleteUser,updateUser,getUsers} = require('../controllers/user.controller.js');
const { verifyUser, verifyToken } = require("../utils/verifyToken.js");


router.get('/', getUsers);
router.get("/:id",verifyToken,getUser);

router.post("/",verifyToken, createUser);

// update a user
router.put("/:id",verifyToken, updateUser);

// delete a user
router.delete("/:id",verifyToken, deleteUser);

module.exports = router;