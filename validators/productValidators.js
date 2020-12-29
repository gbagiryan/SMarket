import {check, validationResult} from "express-validator";

export const validateAddProduct = [
    check('productName')
        .notEmpty()
        .withMessage('Product name is required'),
    check('description')
        .notEmpty()
        .withMessage('Product description is required'),
    check('price')
        .notEmpty()
        .withMessage('Price is required'),
    check('category')
        .notEmpty()
        .withMessage('Category is required'),
];

export const validateEditProduct = [
    check('productName')
        .notEmpty()
        .withMessage('Product name is required'),
    check('description')
        .notEmpty()
        .withMessage('Product description is required'),
    check('price')
        .notEmpty()
        .withMessage('Price is required'),
    check('category')
        .notEmpty()
        .withMessage('Category is required'),
];


export const isValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
}