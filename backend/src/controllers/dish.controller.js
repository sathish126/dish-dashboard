const Dish = require('../models/dish.model');

// @desc    Get all dishes
// @route   GET /api/dishes
// @access  Public
const getDishes = async (req, res, next) => {
  try {
    const dishes = await Dish.find({}).sort({ dishId: 1 });
    res.status(200).json({
      success: true,
      count: dishes.length,
      data: dishes,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle dish published status
// @route   PATCH /api/dishes/:id/toggle
// @access  Public
const togglePublishStatus = async (req, res, next) => {
  try {
    const dishId = parseInt(req.params.id, 10);
    
    if (isNaN(dishId)) {
      const err = new Error('Invalid dish ID format. Must be a number.');
      err.statusCode = 400;
      return next(err);
    }

    const dish = await Dish.findOne({ dishId });

    if (!dish) {
      const err = new Error(`Dish with ID ${dishId} not found`);
      err.statusCode = 404;
      return next(err);
    }

    // Toggle status
    dish.isPublished = !dish.isPublished;
    await dish.save();

    // Retrieve Socket.IO instance attached to the Express app
    const io = req.app.get('io');
    if (io) {
      io.emit('dishUpdated', dish);
      console.log(`Socket.IO: Emitted 'dishUpdated' event for dishId: ${dish.dishId}`);
    }

    res.status(200).json({
      success: true,
      data: dish,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDishes,
  togglePublishStatus,
};
