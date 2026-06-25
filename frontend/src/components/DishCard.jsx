import React, { useState } from 'react';

const DishCard = ({ dish, onToggle }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggle = async () => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      await onToggle(dish.dishId);
    } catch (error) {
      console.error('Error toggling dish status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const { dishName, imageUrl, isPublished } = dish;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col h-full shadow-sm">
      {/* Dish Image */}
      <img
        src={imageUrl}
        alt={dishName}
        className="w-full h-48 object-cover bg-gray-100"
      />

      {/* Card Details */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="font-bold text-gray-900 text-base">{dishName}</h3>
          
          {/* Status Text */}
          <div className="mt-2 text-sm text-gray-600">
            Status:{' '}
            {isPublished ? (
              <span className="text-green-600 font-semibold">Published</span>
            ) : (
              <span className="text-red-600 font-semibold">Unpublished</span>
            )}
          </div>
        </div>

        {/* Action Toggle Button */}
        <button
          onClick={handleToggle}
          disabled={isUpdating}
          className={`w-full mt-4 py-2 px-4 rounded text-sm font-medium transition-colors ${
            isUpdating
              ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
              : isPublished
              ? 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isUpdating ? 'Updating...' : isPublished ? 'Unpublish' : 'Publish'}
        </button>
      </div>
    </div>
  );
};

export default DishCard;
