import User from '../models/User.js';
import mongoose from "mongoose";

const profile_get = async (req, res) => {
    try {
        const paramsId = req.params.userId;
        if (!mongoose.Types.ObjectId.isValid(paramsId)) {
            return res.status(400).json({errorMessage: 'not a valid user id'});
        }
        const user = await User.findById(paramsId)
            .select('-password')
            .populate('products');
        if (!user) {
            return res.status(400).json({errorMessage: 'no user with this id'});
        }

        res.status(200).json({
            id: user.profileId,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            products: user.products
        });
    } catch (err) {
        res.status(500).json({errorMessage: "Server Error"});
    }
}

export default {
    profile_get
};