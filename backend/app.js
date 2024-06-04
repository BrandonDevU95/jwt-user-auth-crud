const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

//Import Routes
const authRoutes = require('./router/auth');
const userRoutes = require('./router/user');
const adminRoutes = require('./router/admin');

//Configure Body Parser
app.use(express.json());

// Configurar cookie-parser
app.use(cookieParser());

//Configure CORS
app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	})
);

//Configure Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', adminRoutes);

module.exports = app;
