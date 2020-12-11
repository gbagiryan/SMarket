import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const login_post = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email})
            .populate('products')
            .populate('cart');

        if (!user) {
            return res.status(400).json({message: 'email doesn\'t exist'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'wrong password'});
        }
        const token = jwt.sign(
            {userId: user.id},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )
        res.cookie('jwt', token, {
            httpOnly: true, sameSite: true, maxAge: 60 * 60 * 1000
        });
        res.status(200).json({
            id: user.profileId,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            products: user.products,
            cart: user.cart
        });

    } catch (err) {
        res.status(500).json(err.message);
    }
};

const register_post = async (req, res) => {
    try {
        const {email, username, password, firstName, lastName} = req.body;
        const candidate = await User.findOne({email});
        if (candidate) {
            return res.status(400).json({message: 'email exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            email,
            password: hashedPassword,
            username,
            profileId: username,
            firstName,
            lastName,
            role: 'user'
        });
        await user.save();

        res.status(201).json({message: "registration successful"});

    } catch (err) {
        res.status(500).json(err.message);
    }
};

const logout_get = (req, res) => {
    try {
        res.clearCookie('jwt');
        res.status(200).json({success: true});
    } catch (err) {
        res.status(500).json(err.message);
    }
}

const isUserAuthed = (req, res) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.json(false);
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                return res.status(400).json({message: 'unauthorized'});
            } else {
                const user = await User.findOne({_id: decodedToken.userId})
                    .populate('products');
                res.json({
                    id: user.profileId,
                    username: user.username,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    products: user.products,
                    cart: user.cart
                });
            }
        });

    } catch (err) {
        res.status(400).json(false, err.message);
    }
};

export default {
    login_post,
    register_post,
    logout_get,
    isUserAuthed
};