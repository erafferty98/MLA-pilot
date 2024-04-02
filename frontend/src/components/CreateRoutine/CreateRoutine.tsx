// import axios from 'axios';
// import React, { useState } from 'react';

// const Chatbot = () => {
//   const [isMinimized, setIsMinimized] = useState(false);
//   const [messages, setMessages] = useState<string[]>([]);
//   const [inputValue, setInputValue] = useState('');

//   const sendMessage = async (message: string) => {
//     if (!message) return;

//     setMessages(messages => [...messages, `You: ${message}`]);
//     setInputValue('');

//     try {
//       const response = await axios.post(`${process.env.NEXT_PUBLIC_API_PATH}/chatbot`, {
//         message
//       });

//       setMessages(messages => [...messages, `Bot: ${response.data.reply}`]);
//     } catch (error) {
//       console.error('Error sending message to backend:', error);
//       setMessages(messages => [...messages, `Bot: I'm sorry, there was an error processing your request.`]);
//     }
//   };

//   return (
//     <div className="chatbot-container">
//       {!isMinimized ? (
//         <div>
//           <div className="chatbot-header">
//             <span>Your Chatbot</span>
//             <button onClick={() => setIsMinimized(true)}>Minimize</button>
//           </div>
//           <div className="chatbot-messages" id="chat-messages">
//             {messages.map((msg, index) => (
//               <div key={index}>{msg}</div>
//             ))}
//           </div>
//           <div className="chatbot-input-area">
//             <input
//               className="chatbot-input"
//               type="text"
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && sendMessage(inputValue)}
//             />
//             <button className="chatbot-button" onClick={() => sendMessage(inputValue)}>Send</button>
//           </div>
//         </div>
//       ) : (
//         <button onClick={() => setIsMinimized(false)}>Open Chat</button>
//       )}
//     </div>
//   );
// };

// export default Chatbot;