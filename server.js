const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes.js');
const calorieRoutes = require('./routes/calorieRoutes.js');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

connectDB();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/', calorieRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
