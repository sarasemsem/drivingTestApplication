const User = require('../models/user.model');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const updateUser = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
      if (!user) {
          return res.status(404).json({message: 'user not found'});
      }
      const updatetedUser = await User.findById(req.params.id);
      res.status(200).json(updatetedUser);

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({message: 'user not found'});
        }
        res.status(200).json({message: 'user deleted'});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  };