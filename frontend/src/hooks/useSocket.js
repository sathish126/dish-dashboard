import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export const useSocket = (onDishUpdated) => {
  const socketRef = useRef(null);
  const callbackRef = useRef(onDishUpdated);

  // Maintain references to the latest callback to avoid resetting socket listeners
  useEffect(() => {
    callbackRef.current = onDishUpdated;
  }, [onDishUpdated]);

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log(`Socket.IO client connected to server: ${socket.id}`);
    });

    socket.on('dishUpdated', (updatedDish) => {
      if (callbackRef.current) {
        callbackRef.current(updatedDish);
      }
    });

    socket.on('connect_error', (error) => {
      console.error('Socket.IO connection error:', error.message);
    });

    return () => {
      socket.disconnect();
      console.log('Socket.IO connection terminated');
    };
  }, []);

  return socketRef.current;
};
