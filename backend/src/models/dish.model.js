const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema(
  {
    dishId: {
      type: Number,
      required: [true, 'Dish ID is required'],
      unique: true,
      index: true,
    },
    dishName: {
      type: String,
      required: [true, 'Dish name is required'],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Optimize database responses by ensuring virtuals/methods exclude technical fields if needed
dishSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Dish', dishSchema);
