const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../models/User');




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

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token });
};
