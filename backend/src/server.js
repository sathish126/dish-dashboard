require('dotenv').config();

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');
const seedDatabase = require('./seed/dish.seed');
const dishRoutes = require('./routes/dish.routes');
const errorHandler = require('./middleware/error.middleware');

const app = express();
const server = http.createServer(app);

// Connect to MongoDB
connectDB().then(() => {
  // Automatically seed database on successful connection if collection is empty
  seedDatabase();
});

// Configure CORS — allow any Vercel deployment + local dev
const isOriginAllowed = (origin) => {
  if (!origin) return true; // curl, Postman, server-to-server
  if (origin.endsWith('.vercel.app')) return true; // all Vercel deployments
  if (process.env.CLIENT_URL && origin === process.env.CLIENT_URL) return true;
  if (origin.startsWith('http://localhost')) return true;
  return false;
};

const corsOptions = {
  origin: (origin, callback) => {
    if (isOriginAllowed(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Initialize Socket.IO with explicit transport support for Render
const io = new Server(server, {
  cors: corsOptions,
  transports: ['websocket', 'polling'],
  allowEIO3: true,
});

// Attach Socket.IO instance to app so it is accessible from controllers
app.set('io', io);

// Handle socket connections
io.on('connection', (socket) => {
  console.log(`Socket.IO client connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Socket.IO client disconnected: ${socket.id}`);
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', time: new Date() });
});

// Mount Routes
app.use('/api/dishes', dishRoutes);

// Catch-all route for unmatched APIs
app.use('*', (req, res, next) => {
  const err = new Error(`Resource Not Found - ${req.originalUrl}`);
  err.statusCode = 404;
  next(err);
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Backend server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
