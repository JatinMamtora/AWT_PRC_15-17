const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const {sanitizeAndValidate} = require('./middleware');
const { check, validationResult } = require('express-validator');


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/courses', sanitizeAndValidate, (req, res) => {
    const {
      university,
      institute,
      department,
      courseName,
      courseCode,
      semester,
    } = req.body;
    const data = save();
    res.status(201).json({ message: 'Course added successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});