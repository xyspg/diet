import { persist } from "zustand/middleware";
import { create } from "zustand";

interface Food {
  name: string;
  quantity: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface MealPlan {
  breakfast: Food[];
  lunch: Food[];
  dinner: Food[];
  others: Food[];
}

interface MealPlanState {
  meals: MealPlan[];
  setMeals: (meals: MealPlan[]) => void;
}

export const useMealPlanStore = create<MealPlanState>()(
  persist(
    (set) => ({
      meals: [],
      setMeals: (meals) => set({ meals }),
    }),
    {
      name: 'meal-plan-storage',
    }
  )
);