const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../models/User');
const { OAuth2Client } = require("google-auth-library");

const generateToken=(userId)=>{
    return jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'1d'
    });
};

exports.postSignup = async (req, res)=>{
    const {name, email, password}= req.body;
    try{
        const userExists = await User.findOne({ email });
        if(userExists){
            return res.status(400).json({message: "User already exists"});
        }
            else{
          const hashedPassword = await bcrypt.hash(password, 10);
          const user =new User({name, email,password:hashedPassword});
          await user.save();

          res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
            }
        }
        catch(error){
            res.status(500).json({message: " server error cannot register new user"});
        }
    
};


exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

  const token = generateToken(user._id);
  res.json({token});
};

exports.googleAuth=async(req,res)=>{
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  try{
    
    const { access_token } = req.body;
    const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const userInfo = await userInfoRes.json();
    let user=await User.findOne({email:userInfo.email});

    if(!user){
      user =new User({
        name:userInfo.name,
        email:userInfo.email,
        googleId:userInfo.sub,

      })
      await user.save();
      console.log(user);
    }
    const authToken=generateToken(user._id);
   return res.json({
      success: true,
      token: authToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  }catch(error){
    console.log("google auth error",error);
    return  res.status(401).json({ success: false, message: "Google authentication failed" });
  }
}