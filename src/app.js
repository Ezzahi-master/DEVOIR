require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const bookRoutes = require('./routes/book.routes');
const externalApiRoutes = require('./routes/externalApi.routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/external', externalApiRoutes);

// Error handling
app.use(errorMiddleware);

// Database connection
require('./config/db');
require('./config/rabbitmq').connect();

const PORT = process.env.PORT || 3002; 
// In src/app.js, add error handling:
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
    
  }
});