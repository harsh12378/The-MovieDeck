
import { createRoot,  } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react';
import { WatchlistProvider } from "./utils/watchListContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
createRoot(document.getElementById('root')).render(
   
    
      <React.StrictMode>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <WatchlistProvider>
      <App />
    </WatchlistProvider>
  </GoogleOAuthProvider>
    
  </React.StrictMode>

      

)
