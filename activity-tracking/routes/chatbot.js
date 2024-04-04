import express from 'express';
import axios from 'axios';
import { Request, Response } from 'express';
import { UserPreferences } from '../models/chatbot.model';

const router = express.Router();

// GET: Retrieve user preferences
export const getUserPreferences = async (req, res) => {
    try {
        const response = await axios.get<UserPreferences>('/api/chatbot');
        return response.data;
    } catch (error) {
        console.error('Error fetching user preferences:', error);
        throw new Error('Failed to fetch user preferences');
    }
};

// POST: Add user preferences
export const sendMessageToChatbot = async (req, res) => {
    try {
        const { message } = req.body;
        const response = await axios.post<string>(`${process.env.ANALYTICS_SERVICE_PATH}/chatbot`, { message });

        // Assuming the routine is returned in the response data
        const routine = response.data;

        // Add the routine to the user's details (modify this part according to your data structure)
        const userPreferences = await UserPreferences.findOneAndUpdate(
            { userId: req.user.id },
            { routine },
            { new: true }
        );

        return userPreferences;
    } catch (error) {
        console.error('Error sending message to chatbot:', error);
        throw new Error('Failed to send message to chatbot');
    }
};
