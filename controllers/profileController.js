import User from '../models/User.js';

const profile_get = async (req, res) => {
    try {
        const paramsId = req.params.userId;
        const user = await User.findOne({profileId: paramsId})
            .select('-password')
            .populate('products');
        if (!user){
            return res.status(400).json({message: 'no user with this id'});
        }

        res.json({
            id: user.profileId,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            products: user.products
        });
    }catch (err) {
        res.status(500).json(err.message);
    }
}

export default {
    profile_get
};