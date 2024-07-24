const express = require('express')
const mongoose = require('mongoose');
const Client = require('./models/client.model');
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose.connect("mongodb+srv://akremDb:0quE1bHuvlKy6GIS@akremapi.wli7wt2.mongodb.net/carDrivingTestDb?retryWrites=true&w=majority&appName=akremAPI").then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => console.log('Listening on port 3000'));
}).catch((err) => {
    console.log(err);
})

app.post('/api/clients', async (req, res) => 
{
    try {
       const client = await Client.create(req.body);
       res.status(201).json(client);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    res.send(req.body);
})
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/api/clients', async (req, res) => 
    {
        try {
           const clients = await Client.find({});
           res.status(200).json(clients);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    });

app.get('/api/client/:id', async (req, res) => 
    {
        try {
           const client = await Client.findById(req.params.id);
           res.status(200).json(client);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    });    

app.put('/api/client/:id', async (req, res) => 
    {
        try {
            const client = await Client.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if (!client) {
                return res.status(404).json({message: 'Client not found'});
            }
            const updatetedClient = await Client.findById(req.params.id);
            res.status(200).json(updatetedClient);
         } catch (error) {
             res.status(500).json({message: error.message});
         }
     });
app.delete('/api/client/:id', async (req, res) => 
    {
        try {
            const client = await Client.findByIdAndDelete(req.params.id);
            if (!client) {
                return res.status(404).json({message: 'Client not found'});
            }
            res.status(200).json({message: 'Client deleted'});
         } catch (error) {
             res.status(500).json({message: error.message});
         }
         res.send(req.body);
     });    