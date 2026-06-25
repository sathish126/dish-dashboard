import React, { useState, useEffect } from 'react';
import { fetchDishes, togglePublishStatus } from '../services/api';
import { useSocket } from '../hooks/useSocket';
import DishList from '../components/DishList';

const Dashboard = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial dishes list
  const loadDishes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchDishes();
      if (response.success && Array.isArray(response.data)) {
        setDishes(response.data);
      } else {
        throw new Error('Invalid data format received from API');
      }
    } catch (err) {
      setError(err.message || 'Failed to load dishes. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDishes();
  }, []);

  // Update a single dish in the local state when changed
  const handleDishUpdated = (updatedDish) => {
    setDishes((prevDishes) =>
      prevDishes.map((dish) =>
        dish.dishId === updatedDish.dishId ? updatedDish : dish
      )
    );
  };

  // Bind Socket.IO hook for real-time updates
  useSocket(handleDishUpdated);

  // Trigger patch request to toggle status
  const handleToggleDish = async (dishId) => {
    try {
      const response = await togglePublishStatus(dishId);
      if (response.success) {
        handleDishUpdated(response.data);
      }
    } catch (err) {
      alert(err.message || 'Failed to update status. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center py-12 text-gray-500 font-medium">
          Loading dishes...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-4 rounded-md text-center max-w-md mx-auto">
          <p className="font-bold">Error loading dishes</p>
          <p className="text-sm mt-1">{error}</p>
          <button
            onClick={loadDishes}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <DishList dishes={dishes} onToggle={handleToggleDish} />
    </div>
  );
};

export default Dashboard;
