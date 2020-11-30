import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'moderator'],
        required: true
    },
    cart: [{type: mongoose.Schema.Types.ObjectID, ref: 'Product'}],
    items: [{type: mongoose.Schema.Types.ObjectID, ref: 'Product'}]
});

export default mongoose.model('User', userSchema);