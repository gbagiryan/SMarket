import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use(express.json({extended: true, limit: '30mb'}));
app.use(express.urlencoded({extended: true, limit: '30mb'}));
app.use(cookieParser());
app.use('/public', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/cart', cartRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => app.listen(PORT, () => {
        console.log(`server started on ${PORT}...`)
    }))
    .catch((err) => {
        console.log(err.message);
        process.exit(1);
    });
