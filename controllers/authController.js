import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';

const login_post = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user) {
            res.status(400).json({message: "wrong email", email});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({message: "wrong password"});
        }
        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )
        res.cookie('jwt', token, {
            httpOnly: true, sameSite: true, maxAge: 60 * 60 * 1000
        });
        res.status(200).json({user: user._id});

    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const register_post = async (req, res) => {
    try {
        const {email, password, firstName, lastName} = req.body;

        const candidate = await User.findOne({email});
        if (candidate) {
            res.status(400).json({message: "email exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({email, password: hashedPassword, firstName, lastName, role: 'user'});
        await user.save();

        res.status(201).json({message: "registration successful"});

    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const logout_get = (req, res) => {
    res.clearCookie('jwt');
    res.status(200).json({success: true});
}

const isUserAuthed = (req, res) => {
    const token = req.cookies.jwt;
    if (!token) {
        res.status(401);
    }
    try {
        jwt.verify(token, config.get('jwtSecret'), async (err, decodedToken) => {
            if (err) {
                res.status(401);
            } else {
                const user = await User.findOne({id: decodedToken.id});
                res.status(200).json({
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                });
            }
        });

    } catch (err) {
        res.status(400).json(err.message);
    }
};

export default {
    login_post,
    register_post,
    logout_get,
    isUserAuthed
};