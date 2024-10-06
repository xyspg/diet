import { persist } from "zustand/middleware";
import { create } from "zustand";
import { foodDatabase } from "../lib/data";

interface Food {
  name: string;
  quantity: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface MealRecord {
  date: string;
  breakfast: Record<string, number>;
  lunch: Record<string, number>;
  dinner: Record<string, number>;
  others: Record<string, number>;
  nutrition: Nutrition;
}

interface MealRecordsState {
  records: MealRecord[];
  addRecord: (record: MealRecord) => void;
  getRecordByDate: (date: string) => MealRecord | undefined;
  updateRecord: (date: string, updatedRecord: MealRecord) => void;
  getLast7DaysRecords: () => MealRecord[]; // New method
}

const calculateNutrition = (meals: Record<string, number>): Nutrition => {
  const nutrition: Nutrition = { calories: 0, protein: 0, carbs: 0, fat: 0 };
  
  Object.entries(meals).forEach(([foodName, weight]) => {
    const food = Object.values(foodDatabase).flat().find(f => f.name === foodName);
    if (food) {
      const multiplier = weight / 100; // Assuming the database values are per 100g
      nutrition.calories += food.calories * multiplier;
      nutrition.protein += food.protein * multiplier;
      nutrition.carbs += food.carbs * multiplier;
      nutrition.fat += food.fat * multiplier;
    }
  });

  return nutrition;
};

export const useMealRecordsStore = create<MealRecordsState>()(
  persist(
    (set, get) => ({
      records: [],
      addRecord: (newRecord) => set((state) => {
        const nutrition = calculateNutrition({
          ...newRecord.breakfast,
          ...newRecord.lunch,
          ...newRecord.dinner,
          ...newRecord.others,
        });
        const recordWithNutrition = { ...newRecord, nutrition };

        const existingIndex = state.records.findIndex(record => record.date === newRecord.date);
        if (existingIndex !== -1) {
          // Replace existing record
          const updatedRecords = [...state.records];
          updatedRecords[existingIndex] = recordWithNutrition;
          return { records: updatedRecords };
        } else {
          // Add new record
          return { records: [...state.records, recordWithNutrition] };
        }
      }),
      getRecordByDate: (date) => {
        const { records } = get();
        return records.find(record => record.date === date);
      },
      updateRecord: (date, updatedRecord) => set((state) => {
        const nutrition = calculateNutrition({
          ...updatedRecord.breakfast,
          ...updatedRecord.lunch,
          ...updatedRecord.dinner,
          ...updatedRecord.others,
        });
        const recordWithNutrition = { ...updatedRecord, nutrition };

        return {
          records: state.records.map(record => 
            record.date === date ? recordWithNutrition : record
          )
        };
      }),
      getLast7DaysRecords: () => {
        const { records } = get();
        const today = new Date();
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          return date.toISOString().split('T')[0];
        });

        return last7Days.map(date => {
          const record = records.find(r => r.date === date);
          if (record) return record;
          return {
            date,
            breakfast: {},
            lunch: {},
            dinner: {},
            others: {},
            nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 }
          };
        }).reverse();
      },
    }),
    {
      name: 'meal-records-storage',
    }
  )
);