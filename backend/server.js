const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const fileUpload = require('express-fileupload');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(fileUpload());

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
