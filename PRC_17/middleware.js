const { check, validationResult } = require('express-validator');

const sanitizeAndValidate = (req, res, next) => {
    req.checkBody('university', 'University name is required').notEmpty();
    req.checkBody('institute', 'Institute name is required').notEmpty();
    req.checkBody('department', 'Department name is required').notEmpty();
    req.checkBody('courseName', 'Course name is required').notEmpty();
    req.checkBody('courseCode', 'Course code is required').notEmpty();
    req.checkBody('semester', 'Semester is required').notEmpty();

    const errors = req.validationresult();
    if (errors) {
      return res.status(400).json({ errors: errors });
    }
    next();
};



module.exports = {sanitizeAndValidate};