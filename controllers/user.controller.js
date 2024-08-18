const User = require('../models/user.model');
const { CreateError } = require('../utils/error.js');
const { CreateSuccess } = require('../utils/success');
const mongoose = require('mongoose');

const getUsers = async (req, res,next) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getUser = async (req, res, next) => {
  try {
      const { id } = req.params;
      // Validate ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(CreateError(400, "Invalid ID format"));
      }
      const user = await User.findById(id);
      if (!user) {
          return next(CreateError(404, "User not found"))
      }
      return res.status(200).json(CreateSuccess(200, "User found", user));
  } catch (error) {
      return next(CreateError(500, error.message))
  }
};
  
  const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
      return next(CreateError(500, error.message));
    }
  };
  
  const updateUser = async (req, res,next) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
      if (!user) {
        return next(CreateError(404, "User not found"));
      }
      const updatetedUser = await User.findById(req.params.id);
      res.status(200).json(updatetedUser);

    } catch (error) {
      return next(CreateError(500, error.message));
    }
  };
  
  const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
          return next(CreateError(404, "User not found"));
        }
        res.status(200).json({message: 'user deleted'});
    } catch (error) {
      return next(CreateError(500, "somthing went wrong"));
    }
  };
  
  module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  };