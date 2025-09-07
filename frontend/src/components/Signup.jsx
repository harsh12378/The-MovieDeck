
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config'
import { useGoogleLogin } from "@react-oauth/google";
export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate =useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();

 try {
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if( response.status===201){
      console.log("user created",data);
      navigate("/login")
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
  const handleGoogleSubmit = useGoogleLogin({
       onSuccess: async (tokenResponse) => {  
       const response = await fetch(`${API_BASE_URL}/api/auth/googleAuth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: tokenResponse.access_token }),
      });
  
      const data = await response.json();
      if(response.ok){
      localStorage.setItem("token",data.token);
      window.dispatchEvent(new Event("loginStatusChanged")); 
        navigate("/");
      }else{
        alert("some server error");
      }
    },
     onError: (err) => console.log("Login Failed", err),
    });

  return (
  <div className="auth-container">
    <div className="auth-box">
      <h2 className="auth-title">Sign Up</h2>
      <form onSubmit={handleRegister} className="auth-form">
        <div className="auth-group">
          <label className="auth-label">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="auth-input"
            placeholder="Enter your name"
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
            placeholder="Enter your email"
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
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="auth-button">Sign Up</button>
      </form>
      <div className="auth-link-row">
        <span>Already have an account?</span>
        <button className="auth-link-btn" onClick={() => window.location.href='/login'}>Login</button>
      </div>
      <div className="divider-row">
        <div className="divider"></div>
        <span className="or-text">OR</span>
        <div className="divider"></div>
      </div>
      <div className="google-btn-row">
        <button className="google-btn" type="button"
        onClick={handleGoogleSubmit}
        >
          <svg className="google-icon" viewBox="0 0 48 48">
            <g>
              <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.5l6.4-6.4C33.5 5.1 28.1 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-8.1 20-21 0-1.3-.1-2.7-.5-4z"/>
              <path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 16.1 19.4 13 24 13c2.7 0 5.2.9 7.2 2.5l6.4-6.4C33.5 5.1 28.1 3 24 3c-7.2 0-13.4 3.1-17.7 8.1z"/>
              <path fill="#FBBC05" d="M24 44c5.6 0 10.7-1.9 14.7-5.1l-6.8-5.6C29.8 38 27 39 24 39c-5.7 0-10.5-3.7-12.2-8.8l-7 5.4C7.9 40.7 15.4 44 24 44z"/>
              <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.2 3.2-4.7 7.5-11.7 7.5-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.5l6.4-6.4C33.5 5.1 28.1 3 24 3c-7.2 0-13.4 3.1-17.7 8.1z"/>
            </g>
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  </div>
);

}
