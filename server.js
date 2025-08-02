const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import routes and middleware
const adminAuth = require('./middleware/adminAuth');
const WebseriesRoutes = require("./routes/WebseriesRoutes");
const UlluActressRoutes = require('./routes/UlluActressRoutes'); 
const StoryRoutes = require("./routes/StoryRoutes");
const DesiLeakRoutes = require("./routes/DesiLeakRoutes");
const ViralRoutes = require("./routes/ViralRoutes");

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://mark32-frontend.onrender.com', 'https://your-custom-domain.com']
    : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Mark32 Backend API is running!',
    status: 'active',
    endpoints: {
      webseries: '/api/webseries',
      stories: '/api/stories',
      actresses: '/api/actresses',
      desileaks: '/api/desileaks',
      viral: '/api/viral',
      admin: '/api/admin/login'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Simple admin login for now (Firebase Admin SDK not needed)
app.post('/api/admin/login', (req, res) => {
  res.json({ message: 'Using Firebase Auth on frontend' });
});

// Public routes (GET only)
app.use("/api/webseries", (req, res, next) => {
  if (req.method === 'GET') return next();
  adminAuth(req, res, next);
}, WebseriesRoutes);

app.use("/api/actresses", (req, res, next) => {
  if (req.method === 'GET') return next();
  adminAuth(req, res, next);
}, UlluActressRoutes);

app.use("/api/stories", (req, res, next) => {
  if (req.method === 'GET') return next();
  adminAuth(req, res, next);
}, StoryRoutes);

app.use("/api/desileaks", (req, res, next) => {
  if (req.method === 'GET') return next();
  adminAuth(req, res, next);
}, DesiLeakRoutes);

app.use("/api/viral", (req, res, next) => {
  if (req.method === 'GET') return next();
  adminAuth(req, res, next);
}, ViralRoutes);

// ❌ REMOVE this duplicate route (already mounted above):
// app.use("/api/leaks", require("./routes/DesiLeakRoutes"));

// Start server after DB connects
const PORT = process.env.PORT || 5000;

console.log("Trying to connect to:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
