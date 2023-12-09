import { create } from 'zustand';

const calculateMacros = (foodItems) => {
  let protein = 0;
  let carbs = 0;
  let fat = 0;
  
  for(i = 0; i < foodItems.length; i++){
    let nutrients = foodItems[i].nutrients;
    protein += nutrients.protein;
    carbs += nutrients.carbohydrates;
    fat += nutrients.fat;
  }

  summed_macros = [protein, carbs, fat]
  return summed_macros;
}

const useFoodStore = create((set) => ({
  dailyFood: {},
  dailyMacros: [],
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
        dailyMacros: calculateMacros(Object.values(data["1"])),
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
