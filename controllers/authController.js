import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const login_post = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email})
            .populate([
                {
                    path: 'products',
                    populate: {
                        path: 'user',
                        select: 'username profileId',
                    }
                },
            ])
            .populate('cart');

        if (!user) {
            return res.status(400).json({errorMessage: 'wrong credentials'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({errorMessage: 'wrong credentials'});
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
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                profilePicture: user.profilePicture,
            },
            products: user.products,
            cart: user.cart
        });

    } catch (err) {
        res.status(500).json({errorMessage: "Server Error"});
    }
};

const register_post = async (req, res) => {
    try {
        const {firstName, lastName, username, email, password} = req.body;
        const file = req.file;

        const candidate = await User.findOne({email});
        if (candidate) {
            return res.status(400).json({errorMessage: 'email exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            email,
            password: hashedPassword,
            username,
            firstName,
            lastName,
            profilePicture: file ? '/public/' + file.filename : null
        });
        await user.save();

        res.status(200).json({successMessage: "registration successful"});

    } catch (err) {
        console.log(err)
        res.status(500).json({errorMessage: "Server Error"});
    }
};

const profile_patch = async (req, res) => {
    try {
        const {email, username, firstName, lastName} = req.body;
        const file = req.file;

        const existingEmail = await User.findOne({email});
        const existingUsername = await User.findOne({username});

        if (email !== req.user.email && existingEmail) {
            return res.status(400).json({errorMessage: 'email already taken'});
        }
        if (username !== req.user.username && existingUsername) {
            return res.status(400).json({errorMessage: 'username already taken'});
        }
        const editedUser = await User.findOneAndUpdate({_id: req.user._id}, {
            email,
            username,
            firstName,
            lastName,
            profilePicture: file ? '/public/' + file.filename : null
        }, {new: true})

        res.status(200).json({
            successMessage: "Profile edited",
            user: {
                username: editedUser.username,
                email: editedUser.email,
                firstName: editedUser.firstName,
                lastName: editedUser.lastName,
                profilePicture: editedUser.profilePicture
            }
        });
    } catch (err) {
        res.status(500).json({errorMessage: "Server Error"});
    }
};

const logout_get = (req, res) => {
    try {
        res.clearCookie('jwt');
        res.status(200).json();
    } catch (err) {
        res.status(500).json({errorMessage: "Server Error"});
    }
}
const verifyAuth = (req, res) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(200).json(false);
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                return res.status(400).json({errorMessage: 'unauthorized'});
            } else {
                const user = await User.findOne({_id: decodedToken.userId})
                    .populate([
                        {
                            path: 'products',
                            populate: {
                                path: 'user',
                                select: 'username profileId',
                            }
                        },
                    ])
                    .populate('cart');
                res.status(200).json({
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        profilePicture: user.profilePicture,
                    },
                    products: user.products,
                    cart: user.cart
                });
            }
        });

    } catch (err) {
        res.status(500).json({errorMessage: "Server Error"});
    }
};

export default {
    login_post,
    register_post,
    logout_get,
    verifyAuth,
    profile_patch
};