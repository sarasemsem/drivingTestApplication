const express = require('express')
const mongoose = require('mongoose');
const Client = require('./models/client.model');
const clientRoute = require('./routes/client.route');
const app = express()

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

mongoose.connect("mongodb+srv://akremDb:0quE1bHuvlKy6GIS@akremapi.wli7wt2.mongodb.net/carDrivingTestDb?retryWrites=true&w=majority&appName=akremAPI").then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => console.log('Listening on port 3000'));
}).catch((err) => {
    console.log(err);
});

// routes
app.use("/api/clients", clientRoute);

