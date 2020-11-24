const {Router} = require('express');
const router = Router();
const authController = require('../controllers/authController');
const {check,} = require('express-validator');

router.post('/login', [
        check('email', 'incorrect email format').normalizeEmail().isEmail(),
        check('password', 'enter password').exists()
    ],
    authController.login_post);

router.post('/register',
    [
        check('email', 'incorrect email format').isEmail(),
        check('password', 'password length must be at least 6 symbols').isLength({min: 6}),
        check('firstName', 'required field').exists(),
        check('lastName', 'required field').exists()
    ],
    authController.register_post);

module.exports = router;