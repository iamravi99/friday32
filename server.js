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
    ? ['https://webflikks.onrender.com', 'https://mark32-frontend.onrender.com']
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
    },
    redirects: {
      adminLogin: 'https://webflikks.onrender.com/singh/login',
      frontend: 'https://webflikks.onrender.com'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Admin login routes
app.post('/api/admin/login', (req, res) => {
  res.json({ message: 'Using Firebase Auth on frontend' });
});

// Redirect /admin/login to frontend /singh/login
app.get('/admin/login', (req, res) => {
  res.redirect('https://webflikks.onrender.com/singh/login');
});

// Also handle /singh/login on backend
app.get('/singh/login', (req, res) => {
  res.redirect('https://webflikks.onrender.com/singh/login');
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
    console.log('🔍 Checking for existing data...');
    
    const webCount = await Webseries.countDocuments();
    console.log(`Found ${webCount} webseries`);
    
    if (webCount === 0) {
      const sampleWebseries = [
        {
          title: "Bold Web Series 1",
          content: "Exciting web series content with bold scenes",
          images: [{ url: "https://picsum.photos/300/400?random=1", position: "top", caption: "Series 1" }],
          rating: 8,
          category: "Drama",
          platform: "Ullu"
        },
        {
          title: "Hot Series 2", 
          content: "Another exciting series with romantic content",
          images: [{ url: "https://picsum.photos/300/400?random=2", position: "top", caption: "Series 2" }],
          rating: 9,
          category: "Romance",
          platform: "Alt Balaji"
        },
        {
          title: "Steamy Series 3", 
          content: "Third series with adult content",
          images: [{ url: "https://picsum.photos/300/400?random=3", position: "top", caption: "Series 3" }],
          rating: 7,
          category: "Adult",
          platform: "Kooku"
        }
      ];
      
      const createdWebseries = await Webseries.insertMany(sampleWebseries);
      console.log(`✅ Added ${createdWebseries.length} sample webseries`);
    }

    const storyCount = await Story.countDocuments();
    if (storyCount === 0) {
      const sampleStories = [
        {
          title: "Romantic Night Story",
          desc: "A beautiful love story",
          content: "Full romantic story content here...",
          images: [{ url: "https://picsum.photos/300/400?random=10", position: "top", caption: "Love Story" }]
        },
        {
          title: "Bold Adventure",
          desc: "An exciting adventure story",
          content: "Adventure story content...",
          images: [{ url: "https://picsum.photos/300/400?random=11", position: "top", caption: "Adventure" }]
        }
      ];
      
      const createdStories = await Story.insertMany(sampleStories);
      console.log(`✅ Added ${createdStories.length} sample stories`);
    }

    const actressCount = await UlluActress.countDocuments();
    if (actressCount === 0) {
      const sampleActresses = [
        {
          name: "Beautiful Actress 1",
          desc: "Popular actress known for bold roles",
          images: [{ url: "https://picsum.photos/300/400?random=20", position: "top", caption: "Actress 1" }]
        },
        {
          name: "Hot Actress 2",
          desc: "Rising star in web series",
          images: [{ url: "https://picsum.photos/300/400?random=21", position: "top", caption: "Actress 2" }]
        }
      ];
      
      const createdActresses = await UlluActress.insertMany(sampleActresses);
      console.log(`✅ Added ${createdActresses.length} sample actresses`);
    }

    const leakCount = await DesiLeak.countDocuments();
    if (leakCount === 0) {
      const sampleLeaks = [
        {
          title: "Viral Leak 1",
          desc: "Trending viral content",
          content: "Full leak content description",
          images: [{ url: "https://picsum.photos/300/400?random=30", position: "top", caption: "Viral 1" }]
        }
      ];
      
      const createdLeaks = await DesiLeak.insertMany(sampleLeaks);
      console.log(`✅ Added ${createdLeaks.length} sample desi leaks`);
    }

    const viralCount = await Viral.countDocuments();
    if (viralCount === 0) {
      const sampleViral = [
        {
          title: "Viral Post 1",
          desc: "Trending viral post",
          content: "Viral content description",
          images: [{ url: "https://picsum.photos/300/400?random=40", position: "top", caption: "Viral Post" }]
        }
      ];
      
      const createdViral = await Viral.insertMany(sampleViral);
      console.log(`✅ Added ${createdViral.length} sample viral content`);
    }
    
    console.log('🎉 Sample data check completed!');
  } catch (error) {
    console.error('❌ Error adding sample data:', error.message);
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
