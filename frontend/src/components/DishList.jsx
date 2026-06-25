import React from 'react';
import DishCard from './DishCard';

const DishList = ({ dishes, onToggle }) => {
  if (dishes.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <p className="text-gray-500 font-medium">No dishes found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dishes.map((dish) => (
        <DishCard key={dish.dishId} dish={dish} onToggle={onToggle} />
      ))}
    </div>
  );
};

export default DishList;
