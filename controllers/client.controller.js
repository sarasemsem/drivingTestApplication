const Client = require('../models/client.model');

const getClients = async (req, res) => {
  try {
    const clients = await Client.find({});
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getClient = async (req, res) => {
    try {
      const { id } = req.params;
      const client = await Client.findById(req.params.id);
      res.status(200).json(client);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const createClient = async (req, res) => {
    try {
        const client = await Client.create(req.body);
        res.status(201).json(client);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const updateClient = async (req, res) => {
    try {
      const client = await Client.findByIdAndUpdate(req.params.id, req.body, {new: true});
      if (!client) {
          return res.status(404).json({message: 'Client not found'});
      }
      const updatetedClient = await Client.findById(req.params.id);
      res.status(200).json(updatetedClient);

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) {
            return res.status(404).json({message: 'Client not found'});
        }
        res.status(200).json({message: 'Client deleted'});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = {
    getClients,
    getClient,
    createClient,
    updateClient,
    deleteClient,
  };