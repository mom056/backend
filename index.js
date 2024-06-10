const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

mongoose.connect(process.env.DB_KEY, {
    // قم بإزالة useNewUrlParser و useUnifiedTopology
}).then(() => {
    console.log('Connected to the database');
}).catch((err) => {
    console.error('Database connection error:', err);
});

const app = express();

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
    res.send('Hello World');
});

// Include routes
require('./routes')(app);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(process.env.PORT || 4000, () => {
    console.log('Server is running on port', process.env.PORT || 4000);
});
