const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

connectDB();
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:4173",
    process.env.FRONTEND_URL,
];

app.use(
    cors({
        origin(origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error(`CORS blocked origin: ${origin}`));
        },
    })
);
app.use(express.json()); // parses data stream from request body into JSON format 
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Contacts API is running",
    });
});

app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok",
    });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});