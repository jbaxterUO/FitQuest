import { create } from 'zustand';

const useFoodStore = create((set) => ({
  dailyFood: {},
  fetchDailyFood: async (dayId, api) => {
    try {
      const response = await fetch(api,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pageNumber: dayId
            })})
      
      const data = await response.json();
      set((state) => ({
        dailyFood: {
          ...state.dailyFood,
          ...data,
        },
      }));
    } catch (error) {
      console.error('Error fetching daily food data:', error);
    }
  },
  setDailyFoodItems: (dayId, items) => {
    set((state) => ({
      dailyFood: {
        ...state.dailyFood,
        [dayId]: items,
      },
    }));
  },
  removeDailyFoodItems: (dayId) => {
    set((state) => {
      const { [dayId]: removedItem, ...rest } = state.dailyFood;
      return { dailyFood: rest };
    });
  },
}));

export default useFoodStore;
