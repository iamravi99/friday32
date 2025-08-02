const mongoose = require('mongoose');
require('dotenv').config();

const Webseries = require('./models/Webseries');
const Story = require('./models/Story');
const UlluActress = require('./models/UlluActress');
const DesiLeak = require('./models/DesiLeak');
const Viral = require('./models/Viral');

const sampleData = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Webseries.deleteMany({}),
      Story.deleteMany({}),
      UlluActress.deleteMany({}),
      DesiLeak.deleteMany({}),
      Viral.deleteMany({})
    ]);
    console.log('🗑️ Cleared existing data');

    // Add sample webseries
    const webseries = await Webseries.insertMany([
      {
        title: "Bold Web Series 1",
        content: "This is a sample web series with exciting content",
        images: [{ url: "https://picsum.photos/300/400?random=1", position: "top", caption: "Series Poster" }],
        rating: 8,
        category: "Drama",
        platform: "Ullu"
      },
      {
        title: "Hot Web Series 2", 
        content: "Another exciting web series",
        images: [{ url: "https://picsum.photos/300/400?random=2", position: "top", caption: "Series Cover" }],
        rating: 9,
        category: "Romance",
        platform: "Alt Balaji"
      }
    ]);
    console.log(`✅ Added ${webseries.length} webseries`);

    // Add sample stories
    const stories = await Story.insertMany([
      {
        title: "Romantic Story 1",
        desc: "A beautiful love story",
        content: "Full story content with romantic elements",
        images: [{ url: "https://picsum.photos/300/400?random=3", position: "top", caption: "Story Image" }]
      },
      {
        title: "Drama Story 2",
        desc: "An intense drama story", 
        content: "Full dramatic story content",
        images: [{ url: "https://picsum.photos/300/400?random=4", position: "top", caption: "Drama Scene" }]
      }
    ]);
    console.log(`✅ Added ${stories.length} stories`);

    // Add sample actresses
    const actresses = await UlluActress.insertMany([
      {
        name: "Beautiful Actress 1",
        desc: "Popular actress known for bold roles",
        images: [{ url: "https://picsum.photos/300/400?random=5", position: "top", caption: "Actress Photo" }]
      },
      {
        name: "Hot Actress 2",
        desc: "Rising star in web series",
        images: [{ url: "https://picsum.photos/300/400?random=6", position: "top", caption: "Star Photo" }]
      }
    ]);
    console.log(`✅ Added ${actresses.length} actresses`);

    // Add sample desi leaks
    const desileaks = await DesiLeak.insertMany([
      {
        title: "Viral Leak 1",
        desc: "Trending viral content",
        content: "Full leak content description",
        images: [{ url: "https://picsum.photos/300/400?random=7", position: "top", caption: "Viral Image" }]
      },
      {
        title: "Hot Leak 2",
        desc: "Popular leaked content",
        content: "Another viral content",
        images: [{ url: "https://picsum.photos/300/400?random=8", position: "top", caption: "Leak Photo" }]
      }
    ]);
    console.log(`✅ Added ${desileaks.length} desi leaks`);

    // Add sample viral content
    const viral = await Viral.insertMany([
      {
        title: "Viral Content 1",
        desc: "Trending viral post",
        content: "Full viral content description",
        images: [{ url: "https://picsum.photos/300/400?random=9", position: "top", caption: "Viral Post" }]
      },
      {
        title: "Hot Viral 2",
        desc: "Popular viral content",
        content: "Another trending post",
        images: [{ url: "https://picsum.photos/300/400?random=10", position: "top", caption: "Trending Image" }]
      }
    ]);
    console.log(`✅ Added ${viral.length} viral content`);

    console.log('🎉 All sample data added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding sample data:', error);
    process.exit(1);
  }
};

sampleData();