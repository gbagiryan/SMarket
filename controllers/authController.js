const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {validationResult} = require('express-validator');

const login_post = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(), message: "incorrect credentials"});
        }

        const {email, password} = req.body;

        const candidate = await User.findOne({email});
        if (candidate) {
            res.status(400).json({message: "email exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User(email, hashedPassword, firstName, lastName);
        await user.save();

        res.status(201).json({message: "registration successful"});

    } catch (err) {
        res.status(500).json({message: "something went wrong..."});
    }
}

const register_post = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(), message: "registration data incorrect"});
        }

        const {email, password, firstName, lastName} = req.body;

        const user = await User.findOne({email});
        if (!user) {
            res.status(400).json({message: "wrong credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({message: "wrong credentials"});
        }
        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )
        res.json({token, userId: user.id})

        res.status(201).json({message: "registration successful"});

    } catch (err) {
        res.status(500).json({message: "something went wrong..."});
    }
}

module.exports = {
    login_post,
    register_post
}