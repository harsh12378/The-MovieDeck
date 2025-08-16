
import React, { useState } from 'react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

 try {
    const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if( response.status===201){
      console.log("user created",data);
      window.location.href='/login?message=User created successfully';
      alert("User created successfully");
    }
    else if(response.status===400){
      alert( "User already exists");
    }
    else if(response.status===500){
      alert("Server error cannot register new user");
    }
  } catch (error) {
    console.error("Error registering user:", error);
  }

  };

  return (
  <div className="auth-container">
    <div className="auth-box">
      <h2 className="auth-title">Sign Up</h2>
      <form onSubmit={handleRegister}>
        <div className="auth-group">
          <label className="auth-label">name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="auth-input"
          />
        </div>
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
        <button type="submit" className="auth-button">Sign Up</button>
      </form>
    </div>
  </div>
);

}
