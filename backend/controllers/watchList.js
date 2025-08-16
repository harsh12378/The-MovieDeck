const jwt= require('jsonwebtoken');
const User = require('../models/User');

exports.addToWatchList =async(req,res)=>{
    const  {movieId}=req.body;
    const authHeader= req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.json({message: " token not provided"});
    }
    try{
        const decoded =jwt.verify(token, process.env.JWT_SECRET);
        const id= decoded.id;
        
         
        const user = await User.findOne({ _id: id});
        
    
        if(!user){
            return res.status(404).json({message: "User not found some error"});
        }
        if(user.watchlist.includes(movieId)){
            return res.status(400).json({message: " movie already in list"});

        }
        user.watchlist.push(movieId);
        await user.save();
        return res.status(200).json({message:" added to list"});
    }
    catch(error){
        return res.status(500).json({message:" some server error in adding to list", error});
    }
}

exports.getWatchList =async(req,res)=>{

    const authHeader =req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    if(!token){
        return res.message({message: " token not provieded"});

    }
    try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id= decoded.id;
    const user = await User.findOne({_id: id});
    console.log(user);
    if(!user){
        return res.status(404).json({message:"user not found"});
    }
    const watchList = user.watchlist;
    if(!watchList || watchList.length === 0){
        return res.status(200).json({message: "watchlist is empty"});
    }
    else{
        return res.status(200).json({watchList});
    }
}
catch(error){
    return res.json({message: " spme server error"});
}
}

exports.removeFromWatchList = async (req, res) => {
  console.log("removeFromWatchList called with body:", req.body);
  
  const { movieId } = req.body;
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  
  console.log("Movie ID to remove:", movieId);
  console.log("Token exists:", !!token);
  
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "No token provided" });
  }
  
  if (!movieId) {
    console.log("No movieId provided");
    return res.status(400).json({ message: "Movie ID is required" });
  }
  
  try {
    console.log("Verifying JWT token...");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    console.log("Decoded user ID:", id);
    
    console.log("Finding user in database...");
    const user = await User.findOne({ _id: id });
    
    if (!user) {
      console.log("User not found for ID:", id);
      return res.status(404).json({ message: "User not found" });
    }
    
    console.log("User found, current watchList:", user.watchlist);
    
    // Check if movie is in watchlist before removing
    if (!user.watchlist.includes(movieId)) {
      console.log("Movie not in watchlist:", movieId);
      return res.status(400).json({ message: "Movie not in watchlist" });
    }
    
    console.log("Removing movie from watchlist...");
    user.watchlist.pull(movieId);
    await user.save();
    
    console.log("Movie removed successfully. New watchList:", user.watchlist);
    return res.status(200).json({ 
      message: "Removed from watchlist",
      watchList: user.watchlist
    });
    
  } catch (error) {
    console.error("Error in removeFromWatchList:", error);
    console.error("Error stack:", error.stack);
    
    // Handle JWT errors specifically
    if (error.name === 'JsonWebTokenError') {
      console.log("Invalid JWT token");
      return res.status(401).json({ message: "Invalid token" });
    }
    if (error.name === 'TokenExpiredError') {
      console.log("JWT token expired");
      return res.status(401).json({ message: "Token expired" });
    }
    
    return res.status(500).json({ 
      message: "Server error", 
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}