const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Define API routes
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
    res.send('API is running');
});

// ✅ Export the app for Vercel
module.exports = app;

// ✅ Add a local server for development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}
