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
        const id= decoded.userId;
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
    if(!token){
        return res.message({message: " token not provieded"});

    }

    try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id= decoded.userId;
    console.log(decoded);
    const user = await User.findOne({_id: id});
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
    return res.json({message: " some server error"});
}
}

exports.removeFromWatchList = async (req, res) => {
  const { movieId } = req.body;
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    
    return res.status(401).json({ message: "No token provided" });
  }
  
  if (!movieId) {
    return res.status(400).json({ message: "Movie ID is required" });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.userId;
    const user = await User.findOne({ _id: id });
    
    if (!user) {

      return res.status(404).json({ message: "User not found" });
    }

    if (!user.watchlist.includes(movieId)) {
      return res.status(400).json({ message: "Movie not in watchlist" });
    }
    user.watchlist.pull(movieId);
    await user.save();

    return res.status(200).json({ 
      message: "Removed from watchlist",
      watchList: user.watchlist
    });
    
  } catch (error) {

    if (error.name === 'JsonWebTokenError') {
  
      return res.status(401).json({ message: "Invalid token" });
    }
    if (error.name === 'TokenExpiredError') {
   
      return res.status(401).json({ message: "Token expired" });
    }
    
    return res.status(500).json({ 
      message: "Server error", 
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}