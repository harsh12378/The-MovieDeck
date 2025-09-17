# 🎬 Movie Explorer App

A full-stack **MERN Movie Explorer App** where you can discover, explore, and save your favorite movies from different domains. The app provides an interactive interface for browsing trending, top-rated, and upcoming movies, along with a personalized **watchlist** feature and secure **Google Authentication**.

---

## 🚀 Features
- 🔍 **Browse Movies** – Explore movies across genres, categories, and trending domains.  
- 🎞 **Movie Details** – View detailed information like synopsis, rating, release date, and posters.  
- ⭐ **Watchlist** – Add or remove movies to your personal watchlist for later viewing.  
- 🔑 **Google Authentication** – Login securely with your Google account.  
- 📱 **Responsive UI** – Works seamlessly on desktop and mobile devices.  

---

## 🛠 Tech Stack
- **Frontend**: React, TailwindCSS (for styling)  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Mongoose ODM)  
- **Authentication**: Google OAuth (using Firebase / Passport.js)  
- **API**: TMDB (The Movie Database API) for fetching movie data  

---

## ⚡ Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/movie-explorer.git
   cd movie-explorer
 ## install dependencies
2. cd frontend && npm install
cd ../backend && npm install
  ## set up envoirnment variables

3. MONGO_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
TMDB_API_KEY=your_tmdb_api_key
JWT_SECRET=your_jwt_secret
 ## run commands

 4. # Backend
cd backend
npm run dev

# Frontend
cd frontend
npm start
