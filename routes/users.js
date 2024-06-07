const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
require('dotenv').config() 

router.post('/register', async (req, res) => {
    const { username, phone, password } = req.body;

    const user = await User.findOne({ username, phone });
 
    if (user) {
        return res.status(400).json({ message: 'Username already taken' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({ username, phone, password: hashedPassword });
    await newUser.save(); 
    return res.json({ message: "User created successfully" });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id }, "momo");
    return res.json({ token, userID: user._id });
});

module.exports = router;
