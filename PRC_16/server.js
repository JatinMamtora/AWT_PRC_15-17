const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

const users = [];

app.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (users.some(user => user.username === username)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = { username, password };
  users.push(newUser);

  res.status(201).json({ message: 'Registration successful' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    const user = users.find(user => user.username === username);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  
    const token = jwt.sign({ username }, 'your-secret-key', { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.json({ message: 'Login successful' });
});

  
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});