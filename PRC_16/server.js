const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const User = require('./models/user.schema')

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'jatin-mamtora',
  resave: false,
  saveUninitialized: true,
}));



app.post('/register',async(req, res) => {
  const { usernm, paswrd } = req.body;

  if (User.find({username: usernm})) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = await User.create({ username: usernm, password: paswrd });

  res.status(201).json({ message: 'Registration successful' });
});

app.post('/login', (req, res) => {
  const { usernm, paswrd } = req.body;

  const user = (User.find({username: usernm}));
    if (!user || user.password !== paswrd) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  
    const token = jwt.sign({ usernm }, 'jatin-mamtora');
    res.cookie('token', token, { httpOnly: true });
    res.json({ message: 'Login successful' });
});

  
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});