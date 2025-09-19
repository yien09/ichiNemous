import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}

export function useWatchlist() {
  const [watchlist, setWatchlist] = useLocalStorage<Array<{ id: number; type: 'movie' | 'tv'; title: string; poster_path: string }>>('ichiNemous-watchlist', []);

  const addToWatchlist = (item: { id: number; type: 'movie' | 'tv'; title: string; poster_path: string }) => {
    setWatchlist(prev => {
      const exists = prev.some(w => w.id === item.id && w.type === item.type);
      if (exists) return prev;
      return [...prev, item];
    });
  };

  const removeFromWatchlist = (id: number, type: 'movie' | 'tv') => {
    setWatchlist(prev => prev.filter(item => !(item.id === id && item.type === type)));
  };

  const isInWatchlist = (id: number, type: 'movie' | 'tv') => {
    return watchlist.some(item => item.id === id && item.type === type);
  };

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
  };
}