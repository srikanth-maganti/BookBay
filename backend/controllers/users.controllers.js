import User from "../models/user.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const loginuser=async(req,res)=>{
    let {email,password}=req.body;
    
    let user=await User.findOne({email});
    if(!user)
    {
        return res.status(400).send("User not found with this email");
    }
    const passwordmatch=await bcrypt.compare(password,user.password);
    if(!passwordmatch)
    {
       return res.status(400).send("Invalid Password");
    }
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
        });
    
    res.json({token});
};

export const signupuser=async (req, res) => {
  let { fullname, email, password } = req.body;

  let existingUser = await User.findOne({ email: email });
  if (existingUser) {
    console.log("exist");
    return res.status(400).send("User already exists with this email");
  }

  let hashedPassword = await bcrypt.hash(password, 10);

  let newUser = new User({
    fullname,
    email,
    password: hashedPassword
  });

  await newUser.save();

  // No need to fetch again, you already have the user
  let token = jwt.sign(
    { userId: newUser._id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  console.log(token);
  res.json({ token });
};