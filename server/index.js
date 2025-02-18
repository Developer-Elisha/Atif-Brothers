const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
connectDB();

// ✅ Configure CORS properly
app.use(cors({
    origin: '*', // Allow all origins temporarily for testing
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());

// ✅ Make sure the correct routes are set
app.use('/', require('./routes/auth'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
