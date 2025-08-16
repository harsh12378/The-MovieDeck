
import  { useState } from 'react';

export default function Login() {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if(response.status===404){
      alert(" user not found");

    }
    else if(response.status===401){
      alert("Invalid credentials");
    }
    else{
      localStorage.setItem('token', data.token);
    
        console.log('Logging in with', { email, password });
      console.log("Login successful", data.token);
       window.dispatchEvent(new Event("loginStatusChanged")); 
      window.location.href = '/';
    }

  } catch (error) {
    console.error("Error logging in:", error);
  }

  
  };

 return (
  <div className="auth-container">
    <div className="auth-box">
      <h2 className="auth-title">Login</h2>
      <form onSubmit={handleLogin}>
        
        <div className="auth-group">
          <label className="auth-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="auth-input"
          />
        </div>
        <div className="auth-group">
          <label className="auth-label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="auth-input"
          />
        </div>
        <button type="submit" className="auth-button">Login</button>
      </form>
    </div>
  </div>
);

}
