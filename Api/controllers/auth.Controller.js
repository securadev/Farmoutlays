const User = require("../model/auth.Model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

     if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "Email already registered" });
    }

     // Hash password in controller
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const savedUser = await User.create({name, email, password:hashedPassword});
    res.status(201).json(savedUser);
  } catch (err) {
   
    res.status(500).json(err);
  }
};

// READ ALL
exports.login = async (req, res) => {

     const { email, password } = req.body;

     if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
      }

    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(400).json({ message: "This email is not registered, Please register yourself first." });
    }

     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        {id:user._id},
        "SECRET KEY This is secret, This is the end",
        {expiresIn:"1d"}
      )


  
  res.json({message:"Login Successful", token:token});
};

