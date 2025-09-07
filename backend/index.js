const express= require('express');
const mongoose =require('mongoose');
const cors =require('cors');

require("dotenv").config();

const app=express();
app.use(cors());
app.use(express.json());

const authRoutes= require('./routes/auth');
const watchListRoutes =require('./routes/watchListRouter')
app.use('/api/auth',authRoutes);
app.use('/api/watchlist',watchListRoutes);
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true, 
    });
    
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
}
connectDB();
const allowedOrigins=[
  "https://moviedeck-app.netlify.app",
  "http://localhost:5173",
]
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("cors error");
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
const port=5000;
app.listen(port,()=>{
    console.log('server on http://localhost:5000')
})