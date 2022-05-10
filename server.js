const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config({path:"./src/.env"});
const port = process.env.PORT || 5000;
const { errorHandler } = require('./src/middleware/errorMiddleware');
const connectDB = require('./src/config/db');
const cors = require('cors');

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use('/api/tutors', require('./src/routes/tutorRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/reports', require('./src/routes/reportRoutes'))
app.use('/api/transactions', require('./src/routes/transactionRoutes'))
app.use(errorHandler);
app.listen(port, () => console.log(`Listening on port: ${port}`))
