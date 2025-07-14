import { useState } from 'react';


export default function ChatBox({ onClose }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can I help you?' }
  ]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage=input;
    setMessages(prev => [...prev, { from: 'user', text: input }]);
    setInput('');

    try{
      const res =await fetch ('/.netlify/functions/chat',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body :JSON.stringify({message:userMessage})
      })
     
      const data=await res.json();
      
      
      setMessages(prev =>[...prev,{from:'bot',text:data.reply||"sorry, I didnt get that"}])
    } catch(err){
   
      setMessages(prev =>[...prev,{from:'bot',text:"error"}])
    }
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
