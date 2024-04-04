const axios = require('axios');
const { sendMessageToChatbot } = require('../../routes/userpreferences');

jest.mock('axios');

describe('sendMessageToChatbot', () => {
  it('should send a message to the chatbot and update user preferences', async () => {
    const req = {
      body: {
        message: 'Hello, chatbot!'
      },
      user: {
        id: 'user123'
      }
    };

    const res = {};

    const mockResponse = {
      data: 'routine123'
    };

    axios.post.mockResolvedValue(mockResponse);

    const userPreferencesMock = {
      userId: 'user123',
      routine: 'routine123'
    };

    const findOneAndUpdateMock = jest.fn().mockResolvedValue(userPreferencesMock);
    const UserPreferences = {
      findOneAndUpdate: findOneAndUpdateMock
    };

    const result = await sendMessageToChatbot(req, res);

    expect(axios.post).toHaveBeenCalledWith(`${process.env.ANALYTICS_SERVICE_PATH}/chatbot`, {
      message: 'Hello, chatbot!'
    });

    expect(findOneAndUpdateMock).toHaveBeenCalledWith(
      { userId: 'user123' },
      { routine: 'routine123' },
      { new: true }
    );

    expect(result).toEqual(userPreferencesMock);
  });

  it('should throw an error if sending message to chatbot fails', async () => {
    const req = {
      body: {
        message: 'Hello, chatbot!'
      },
      user: {
        id: 'user123'
      }
    };

    const res = {};

    const mockError = new Error('Failed to send message to chatbot');
    axios.post.mockRejectedValue(mockError);

    await expect(sendMessageToChatbot(req, res)).rejects.toThrowError('Failed to send message to chatbot');
  });
});