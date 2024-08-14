const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { CreateSuccess } = require("../utils/success.js");
const { CreateError } = require("../utils/error.js");
const jwtoken = require("jsonwebtoken");
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body.credentials;
        const user = await User.findOne({ email });

        if (!user) return next(CreateError(404, "User not found"));

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return next(CreateError(400, "Wrong password"));

        const token = jwtoken.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
        user.token = token;

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({
            success: true,
            message: "Login successful",
            data: { user }
        });
    } catch (error) {
        next(CreateError(500, error.message));
    }
};


const register = async (req, res, next) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) return next(CreateError(400, "User already exists"));

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
        next(CreateError(500, error.message));
    }
};


  module.exports = {
    login,
    register
  }