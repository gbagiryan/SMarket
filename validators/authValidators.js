import {check, validationResult} from "express-validator";

export const validateRegister = [
    check('firstName')
        .notEmpty()
        .withMessage('First Name is required'),
    check('lastName')
        .notEmpty()
        .withMessage('Last Name is required'),
    check('username')
        .notEmpty()
        .withMessage('Username is required'),
    check('email')
        .isEmail()
        .withMessage('Valid Email is required'),
    check('password')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long')
];
export const validateEditProfile = [
    check('firstName')
        .notEmpty()
        .withMessage('First Name is required'),
    check('lastName')
        .notEmpty()
        .withMessage('Last Name is required'),
    check('username')
        .notEmpty()
        .withMessage('Username is required'),
    check('email')
        .isEmail()
        .withMessage('Valid Email is required')
];
export const validateLogin = [
    check('email')
        .isEmail()
        .withMessage('Valid Email is required'),
    check('password')
        .notEmpty()
        .withMessage('Password is required')
];

export const isValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
}