const express = require("express");
const router = express.Router();
const {login, register,sendEmail, resetPassword} = require('../controllers/auth.controller.js');


router.express = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/send-email',sendEmail);
router.post('/reset-password',resetPassword);
module.exports = router