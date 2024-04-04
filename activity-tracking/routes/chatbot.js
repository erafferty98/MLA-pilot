const express = require('express');
const axios = require('axios');
const UserPreferences = require('../models/chatbot.model');

const router = express.Router();

// GET: Retrieve user preferences
router.get('/', async (req, res) => {
    try {
        const response = await axios.get('/api/chatbot');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching user preferences:', error);
        res.status(500).json({ error: 'Failed to fetch user preferences' });
    }
});

// POST: Add user preferences
router.post('/', async (req, res) => {
    try {
        const { message } = req.body;
        const response = await axios.post(`${process.env.ANALYTICS_SERVICE_PATH}/chatbot`, { message });

        // Assuming the routine is returned in the response data
        const routine = response.data;

        // Add the routine to the user's details (modify this part according to your data structure)
        const userPreferences = await UserPreferences.findOneAndUpdate(
            { userId: req.user.id },
            { routine },
            { new: true }
        );

        res.json(userPreferences);
    } catch (error) {
        console.error('Error sending message to chatbot:', error);
        res.status(500).json({ error: 'Failed to send message to chatbot' });
    }
});

module.exports = router;