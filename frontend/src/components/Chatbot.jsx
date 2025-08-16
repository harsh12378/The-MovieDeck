
import { useState } from 'react';
import ChatBox from './Chatbox.jsx';

export default function ChatButton() {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => setShowChat(prev => !prev);

  return (
    <>
      {showChat && <ChatBox onClose={toggleChat} />}
      <button className="chat-button" onClick={toggleChat}>💬</button>
    </>
  );
}
