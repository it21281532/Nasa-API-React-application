const express = require('express');//server
const mongoose = require('mongoose');//schema
const cors = require('cors');//api/db error
const bodyParser = require("body-parser");//parse data into json
const bcrypt = require('bcrypt');//hash
const jwt = require("jsonwebtoken");//token
const User = require('./models/userSchema')

require("dotenv").config();

const PORT = process.env.PORT || 8070;

//connect to express app
const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    
    app.listen(PORT, () => {
        console.log(`App is running on ${PORT}`);
    });
    console.log('MongoDB connected')
  })
  .catch(error => console.error('Failed to connect to MongoDB:', error));

// Middleware
app.use(cors());
app.use(bodyParser.json());

//Routes
//user reg
//post reg
app.post('/register', async (req, res) => {
    try {
        const { name, email, password,role } = req.body;

        const user = await User.findOne({email});
        if(!user){
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = new User({ name, email, password: hashedPassword,role }); 
            await newUser.save();
        
            res.status(201).json({ message: 'User created successfully' });
        }else{
            res.status(403).json({ error: 'Email already exists. Please use a different email or Login.' });
        }
        

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error signing up' });
    }
});

//get register
app.get('/register', async (req, res) => {
    try {
        const users = await User.find()

        res.status(201).json(users);

    } catch (error) {
        res.status(500).json({ error: 'Unable to get Users' });
    }
});

//user login
//post login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});

        if(!user){
            res.status(401).json({ error: 'Invalid Credentials.' });
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(!isPasswordValid){
            return res.status(401).json({ error: 'Invalid Credentials.' });
        }

        const token = jwt.sign({userID:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1hr'})

        res.json({ message: 'Login success',token });

    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
});



