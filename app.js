const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();

app.use('/api/auth', require('./routes/authRoutes'));


const PORT = config.get('port') || 5000;

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
