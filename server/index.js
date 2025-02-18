const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const path = require('path');
require('dotenv').config();


const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/', require('./routes/auth'));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));



app.get('/', (req, res) => {
    res.send('Welcome to the authentication API');
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
