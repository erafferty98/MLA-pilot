import axios from 'axios';

export interface UserPreferences {
  goal: string;
  fitnessLevel: string;
  availableTime: string;
  workoutSchedule: string;
  equipment: string;
  limitations: string;
  feedback: string;
}

export const getUserPreferences = async (): Promise<UserPreferences> => {
  try {
    const response = await axios.get<UserPreferences>('/api/userPreferences');
    return response.data;
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    throw new Error('Failed to fetch user preferences');
  }
};

export const sendMessageToChatbot = async (message: string): Promise<string> => {
  try {
    const response = await axios.post<string>(`${process.env.ANALYTICS_SERVICE_PATH}/chatbot`, { message });
    return response.data;
  } catch (error) {
    console.error('Error sending message to chatbot:', error);
    throw new Error('Failed to send message to chatbot');
  }
};