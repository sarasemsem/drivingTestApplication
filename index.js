const express = require('express')
const mongoose = require('mongoose');
const clientRoute = require('./routes/client.route');
const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const clientTestDataRoute = require('./routes/clientTestData.route');
const cors = require('cors');
const app = express()
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();
// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
    origin: ["http://localhost:4200"],
    credentials: true
}));
app.use(cookieParser());

// routes
app.use("/api/clients", clientRoute);
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/clientTestData", clientTestDataRoute);

// Response Handler middleware
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message,
        data: err.data || null
        //stack: err.stack
    });
});

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => console.log('Listening on port 3000'));
}).catch((err) => {
    console.log(err);
});



