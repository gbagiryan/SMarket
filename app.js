import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = config.get('port') || 5000;

app.use(express.json({extended: true, limit: '30mb'}));
app.use(express.urlencoded({extended: true, limit: '30mb'}))
app.use(cookieParser());

app.use('/api/auth', authRoutes);

mongoose.connect(config.get('mongoUri'), {
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
