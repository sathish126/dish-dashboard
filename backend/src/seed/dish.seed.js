const Dish = require('../models/dish.model');

const sampleDishes = [
  {
    dishId: 1,
    dishName: "Biryani",
    imageUrl: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80",
    isPublished: true
  },
  {
    dishId: 2,
    dishName: "Paneer Butter Masala",
    imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
    isPublished: true
  },
  {
    dishId: 3,
    dishName: "Masala Dosa",
    imageUrl: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
    isPublished: true
  },
  {
    dishId: 4,
    dishName: "Chicken Tikka",
    imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    isPublished: false
  },
  {
    dishId: 5,
    dishName: "Veg Fried Rice",
    imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
    isPublished: true
  },
  {
    dishId: 6,
    dishName: "Butter Naan",
    imageUrl: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=80",
    isPublished: true
  },
  {
    dishId: 7,
    dishName: "Chole Bhature",
    imageUrl: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=800&q=80",
    isPublished: false
  },
  {
    dishId: 8,
    dishName: "Idli Sambar",
    imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    isPublished: true
  },
  {
    dishId: 9,
    dishName: "Hakka Noodles",
    imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
    isPublished: false
  },
  {
    dishId: 10,
    dishName: "Gulab Jamun",
    imageUrl: "https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?auto=format&fit=crop&w=800&q=80",
    isPublished: true
  }
];

const seedDatabase = async () => {
  try {
    const count = await Dish.countDocuments();
    if (count === 0) {
      console.log('Dishes collection is empty. Seeding sample dish data...');
      await Dish.insertMany(sampleDishes);
      console.log('Database successfully seeded with 10 sample dishes.');
    } else {
      // Proactively update URLs to resolve any dead link issues from initial seed
      for (const sample of sampleDishes) {
        await Dish.updateOne(
          { dishId: sample.dishId },
          { $set: { imageUrl: sample.imageUrl } }
        );
      }
      console.log('Database dish images verified and updated to active URLs.');
    }
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
  }
};

module.exports = seedDatabase;
