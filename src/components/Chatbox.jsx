import { useState } from 'react';


export default function ChatBox({ onClose }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can I help you?' }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    
    setMessages(prev => [...prev, { from: 'user', text: input }]);
    setInput('');

    // TODO: Send input to Hugging Face API 
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <h4>ASK AI</h4>
        <button onClick={onClose}className='cross-button'>✖</button>
      </div>

      <div className="chatbox-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`msg ${msg.from}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <form className="chatbox-input" onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
