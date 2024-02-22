const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorHandler')
const connectDB = require('./config/db')
const cors = require('cors');
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
}));

const PORT = process.env.PORT || 5000

connectDB();

app.use('/uploads',express.static('uploads'))

app.use('/auth', require('./routes/userRoutes'))
app.use('/dashboard', require('./routes/dashboardRoutes'))
// app.use('/api/goals', require('./routes/goalRoutes'))

app.use(errorHandler)

app.listen(PORT, (req, res) => {
    console.log(`server is running on port ${PORT}`);
})
