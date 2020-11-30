import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        maxLength: 50
    },
    description: {
        type: String,
        required: true,
        maxLength: 300
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

export default mongoose.model('Product', productSchema);