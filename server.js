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

// Add sample data function
const addSampleData = async () => {
  const Webseries = require('./models/Webseries');
  const Story = require('./models/Story');
  const UlluActress = require('./models/UlluActress');
  const DesiLeak = require('./models/DesiLeak');
  const Viral = require('./models/Viral');

  try {
    const webCount = await Webseries.countDocuments();
    if (webCount === 0) {
      await Webseries.insertMany([
        {
          title: "Bold Web Series 1",
          content: "Exciting web series content",
          image: "https://picsum.photos/300/400?random=1",
          images: [{ url: "https://picsum.photos/300/400?random=1", position: "top" }]
        },
        {
          title: "Hot Series 2", 
          content: "Another exciting series",
          image: "https://picsum.photos/300/400?random=2",
          images: [{ url: "https://picsum.photos/300/400?random=2", position: "top" }]
        }
      ]);
      console.log('✅ Added sample webseries');
    }

    const storyCount = await Story.countDocuments();
    if (storyCount === 0) {
      await Story.insertMany([
        {
          title: "Romantic Story",
          desc: "Beautiful love story",
          content: "Full story content",
          image: "https://picsum.photos/300/400?random=3",
          images: [{ url: "https://picsum.photos/300/400?random=3", position: "top" }]
        }
      ]);
      console.log('✅ Added sample stories');
    }

    const actressCount = await UlluActress.countDocuments();
    if (actressCount === 0) {
      await UlluActress.insertMany([
        {
          name: "Beautiful Actress",
          desc: "Popular actress",
          image: "https://picsum.photos/300/400?random=4",
          images: [{ url: "https://picsum.photos/300/400?random=4", position: "top" }]
        }
      ]);
      console.log('✅ Added sample actresses');
    }

    const leakCount = await DesiLeak.countDocuments();
    if (leakCount === 0) {
      await DesiLeak.insertMany([
        {
          title: "Viral Content",
          desc: "Trending content",
          content: "Full content",
          image: "https://picsum.photos/300/400?random=5",
          images: [{ url: "https://picsum.photos/300/400?random=5", position: "top" }]
        }
      ]);
      console.log('✅ Added sample desi leaks');
    }

    const viralCount = await Viral.countDocuments();
    if (viralCount === 0) {
      await Viral.insertMany([
        {
          title: "Viral Post",
          desc: "Trending post",
          content: "Viral content",
          image: "https://picsum.photos/300/400?random=6",
          images: [{ url: "https://picsum.photos/300/400?random=6", position: "top" }]
        }
      ]);
      console.log('✅ Added sample viral content');
    }
  } catch (error) {
    console.error('❌ Error adding sample data:', error);
  }
};

// Start server after DB connects
const PORT = process.env.PORT || 5000;

console.log("Trying to connect to:", process.env.MONGO_URI);

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI environment variable not set!");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB Atlas");
    await addSampleData();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    console.error("Full error:", err);
    process.exit(1);
  });
