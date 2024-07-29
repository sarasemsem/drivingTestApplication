const express = require('express')
const mongoose = require('mongoose');
const clientRoute = require('./routes/client.route');
const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const app = express()
const dotenv = require('dotenv');
dotenv.config();
// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Response Handler middleware
app.use((obj, req, res, next) => {
    const statusCode = obj.status || 500;
    const message = obj.message || "Something went wrong";
    return res.status(statusCode).json({
        success: [200,201,204].some(a => a === obj.status)? true : false,
        status: statusCode,
        message: message,
        data: obj.data
    });
});

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => console.log('Listening on port 3000'));
}).catch((err) => {
    console.log(err);
});

// routes
app.use("/api/clients", clientRoute);
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

