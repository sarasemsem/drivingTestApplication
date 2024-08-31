const Client = require('../models/client.model');
const TestData = require('../models/testData.model');

const getClients = async (req, res) => {
  try {
    const clients = await Client.find({}).populate('tests');;
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getClient = async (req, res) => {
    try {
      const { id } = req.params;
      const client = await Client.findById(req.params.id).populate('tests');;
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
        if(client.tests.length > 0){
            await TestData.deleteMany({ _id: { $in: client.tests } });
        }
        res.status(200).json({message: 'Client deleted'});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const getClientToTest = async (req, res) => {
    //const macAddress = req.query.macAddress;
    try {
        // Find a client with startToPlay = true and adressePc = macAddress
        /* const clientData = await Client.findOne({
            startToPlay: true,
            adressePc: macAddress
        }); */
        const id ="66b8eb04c651687f382c49aa"
        const clientData = await Client.findOne({_id: id}).populate('tests');;
        if (clientData) {
            res.json(clientData); // Return the client data
        } else {
            res.status(404).json({ error: 'Client not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error connecting to the database');
    }
};

const updateScore= async (req, res) => {
console.log("body is"+ req.body)
    const clientData = req.body.clients;
    try {
        const { _id, ...updateFields } = clientData;
        // Create a filter to find the document by _id
        const filter = { _id: new ObjectId(_id) };
        // Create an update operation
        const update = { $set: updateFields };

        // Perform the update operation
        const updatedClient = await Client.findOneAndUpdate(filter, update, {
            returnDocument: 'after', 
        });
        console.log("Updated client:", updatedClient);
        if (updatedClient._id) {
            res.json(updatedClient.value); // Return the updated client data
        } else {
            res.status(404).json({ error: 'Client not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error connecting to the database');
    }
};

  module.exports = {
    getClients,
    getClient,
    createClient,
    updateClient,
    deleteClient,
    getClientToTest,
    updateScore
  };