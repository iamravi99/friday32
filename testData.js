const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Webseries = require('./models/Webseries');
const Story = require('./models/Story');
const UlluActress = require('./models/UlluActress');
const DesiLeak = require('./models/DesiLeak');
const Viral = require('./models/Viral');

const sampleData = {
  webseries: [
    {
      title: "Bold Web Series 1",
      content: "This is a sample web series content",
      images: [{ url: "https://via.placeholder.com/300x400", position: "top", caption: "Sample Image" }],
      rating: 8,
      category: "Drama",
      platform: "Ullu"
    }
  ],
  stories: [
    {
      title: "Sample Story",
      desc: "This is a sample story description",
      content: "Full story content here",
      images: [{ url: "https://via.placeholder.com/300x400", position: "top", caption: "Story Image" }]
    }
  ],
  actresses: [
    {
      name: "Sample Actress",
      desc: "Sample actress description",
      images: [{ url: "https://via.placeholder.com/300x400", position: "top", caption: "Actress Photo" }]
    }
  ],
  desileaks: [
    {
      title: "Sample Leak",
      desc: "Sample leak description",
      content: "Full leak content",
      images: [{ url: "https://via.placeholder.com/300x400", position: "top", caption: "Leak Image" }]
    }
  ],
  viral: [
    {
      title: "Sample Viral",
      desc: "Sample viral description",
      content: "Full viral content",
      images: [{ url: "https://via.placeholder.com/300x400", position: "top", caption: "Viral Image" }]
    }
  ]
};

async function addSampleData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Add sample data
    await Webseries.insertMany(sampleData.webseries);
    await Story.insertMany(sampleData.stories);
    await UlluActress.insertMany(sampleData.actresses);
    await DesiLeak.insertMany(sampleData.desileaks);
    await Viral.insertMany(sampleData.viral);

    console.log('Sample data added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Run only if called directly
if (require.main === module) {
  addSampleData();
}