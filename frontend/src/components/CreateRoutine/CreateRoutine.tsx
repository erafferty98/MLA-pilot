import { useState } from 'react';
import { Modal, Textarea, Button, Group, Text, Box } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';

// Interface for ChatMessage with type annotations
interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

// Interface for CreateRoutineProps with type annotations
interface CreateRoutineProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateRoutine: React.FC<CreateRoutineProps> = ({ isOpen, onClose }) => {
  const [userInput, setUserInput] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const sendMessage = () => {
    if (!userInput.trim()) return;

    setMessages((currentMessages: ChatMessage[]) => [...currentMessages, { sender: 'user', text: userInput }]);
    setUserInput('');

    // Simulate a response from the backend after processing with OpenAI
    setTimeout(() => {
      setMessages((currentMessages: ChatMessage[]) => [...currentMessages, { sender: 'bot', text: 'Here is your personalized workout routine...' }]);
    }, 1000);
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Workout Routine Assistant" size="lg">
      <Box sx={{ maxHeight: 300, overflowY: 'auto' }}> {/* Using sx prop for styles */}
        {messages.map((message: ChatMessage, index: number) => ( // Type annotations for map function variables
          <Group key={index} position={message.sender === 'user' ? 'right' : 'left'}>
            <Text>{message.text}</Text>
          </Group>
        ))}
      </Box>
      <Textarea
        placeholder="Ask me for a workout routine..."
        value={userInput}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setUserInput(e.currentTarget.value)}
        mt="md"
      />
      <Button rightIcon={<IconSend size={16} />} mt="md" onClick={sendMessage}>
        Send
      </Button>
    </Modal>
  );
};

export default CreateRoutine;