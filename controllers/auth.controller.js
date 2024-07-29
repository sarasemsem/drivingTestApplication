const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { CreateSuccess } = require("../utils/success.js");
const { createError } = require("../utils/error.js");
const jwtoken = require("jsonwebtoken");
const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return next(createError(404, "User not found"));
        
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return next(createError(400, "Wrong password"));
        const token = jwtoken.sign({ _id: user._id }, process.env.JWT_SECRET);

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({ success: true, message: "Login successfully", user });
    } catch (error) {
        next(createError(500, error.message));
    }
};

const register = async (req, res, next) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) return next(createError(400, "User already exists"));

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json(CreateSuccess(201, "User created successfully", newUser));
    } catch (error) {
        next(createError(500, error.message));
    }
};


  module.exports = {
    login,
    register
  }