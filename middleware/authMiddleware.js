import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const requireAuth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({message: "unauthorized"});
        }
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!verifiedToken) {
            return res.status(401).json({message: "unauthorized"});
        } else {
            req.user = await User.findById(verifiedToken.userId);
            next();
        }

    } catch (err) {
        res.status(500).json(err.message);
    }
};

export default requireAuth;