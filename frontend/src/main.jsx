
import { createRoot,  } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react';
import { WatchlistProvider } from "./utils/watchListContext.jsx";
createRoot(document.getElementById('root')).render(
   
    
      <React.StrictMode>
    <WatchlistProvider>
      <App />
    </WatchlistProvider>
  </React.StrictMode>

      

)
