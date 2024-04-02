'use client'
import { TextInput, Button, rem } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { getUserPreferences } from '../../utils/chatbotpreferences';

import classes from './CreateRoutine.module.css';
import Spinner from '../Spinner';

const userIcon = (
  <IconUser style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
);

const CreateRoutine = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const sendInitialMessage = async () => {
      try {
        let initialMessage = '';
        const userPreferences = await getUserPreferences();

        if (userPreferences) {
          initialMessage = `Hello, I am your workout routine virtual assistant. Here's your workout preferences:
          - Goal: ${userPreferences.goal} 
          - Fitness Level: ${userPreferences.fitnessLevel} 
          - Available Time: ${userPreferences.availableTime} 
          - Preferred Days/Times: ${userPreferences.workoutSchedule} 
          - Equipment: ${userPreferences.equipment}
          - Limitations: ${userPreferences.limitations}
          - Feedback on Last Plan: ${userPreferences.feedback}
          Based on this, what would be a good weekly workout plan?`;
        } else {
          initialMessage = 'Hello, I am your workout routine virtual assistant. Can you please provide me with your workout preferences?';
        }

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_PATH}/chatbot`, {
          message: initialMessage
        });

        setMessages(messages => [...messages, `Bot: ${response.data.reply}`]);
      } catch (error) {
        console.error('Error sending initial message to backend:', error);
        setMessages(messages => [...messages, `Bot: I'm sorry, there was an error processing your request.`]);
      }
    };

    sendInitialMessage();
  }, []);

  const sendMessage = async (message: string) => {
    if (!message) return;

    setMessages(messages => [...messages, `You: ${message}`]);
    setInputValue('');

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_PATH}/chatbot`, {
        message
      });

      setMessages(messages => [...messages, `Bot: ${response.data.reply}`]);
    } catch (error) {
      console.error('Error sending message to backend:', error);
      setMessages(messages => [...messages, `Bot: I'm sorry, there was an error processing your request.`]);
    }
  };

  return (
    <div className={classes.chatbotContainer}>
      {!isMinimized ? (
        <div>
          <div className={classes.chatbotMessages} id="chat-messages">
            {messages.map((msg, index) => (
              <div key={index}>{msg}</div>
            ))}
          </div>
          <div className={classes.chatbotInputArea}>
            <TextInput
              className={classes.chatbotInput}
              placeholder="Type your message here"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(inputValue)}
              rightSection={<Button className={classes.chatbotButton} onClick={() => sendMessage(inputValue)} style={{ color: 'white' }}>Submit</Button>}
            />
          </div>
        </div>
      ) : (
        <button className={classes.openChatButton} onClick={() => setIsMinimized(false)}>Open Chat</button>
      )}
    </div>
  );
};

export default CreateRoutine;