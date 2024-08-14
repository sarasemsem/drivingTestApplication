const express = require("express");
const User = require("../models/user.model.js");
const router = express.Router();
const {createUser,getUser,deleteUser,updateUser,getUsers} = require('../controllers/user.controller.js');
const { verifyUser } = require("../utils/verifyToken.js");


router.get('/',verifyUser, getUsers);
router.get("/:id", verifyUser,getUser);

router.post("/",verifyUser, createUser);

// update a user
router.put("/:id",verifyUser, updateUser);

// delete a user
router.delete("/:id",verifyUser, deleteUser);

module.exports = router;