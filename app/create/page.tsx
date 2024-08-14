"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMealPlanStore } from '@/store/MealPlanStore';
import { useMealRecordsStore, MealRecord } from '@/store/MealRecordsStore';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export default function CreatePage() {
  const { register, handleSubmit, setValue } = useForm();
  const mealPlan = useMealPlanStore(state => state.meals[0]) || {};
  const [intakeData, setIntakeData] = useState({});
  const { addRecord, getRecordByDate } = useMealRecordsStore();
  const router = useRouter()
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const existingRecord = getRecordByDate(today);
    if (existingRecord) {
      // Populate form with existing data
      Object.entries(existingRecord).forEach(([mealType, foods]) => {
        if (typeof foods === 'object' && foods !== null) {
          Object.entries(foods).forEach(([foodName, quantity]) => {
            setValue(`${mealType}.${foodName}`, quantity);
          });
        }
      });
      setIntakeData(existingRecord);
    }
  }, [getRecordByDate, setValue, today]);

  const onSubmit = (data: Record<string, Record<string, number>>) => {
    setIntakeData(data);
    const newRecord: MealRecord = {
      date: today,
      breakfast: data.breakfast || {},
      lunch: data.lunch || {},
      dinner: data.dinner || {},
      others: data.others || {},
      nutrition: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      }
    };

    addRecord(newRecord);
    toast({
      title: "记录提交成功",
      description: "您今日的摄入记录已成功提交",
    });
    router.push('/');
  };

  const renderMealSection = (mealType: string, foods: Array<{ name: string; quantity: number }>) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="capitalize">{mealType}</CardTitle>
      </CardHeader>
      <CardContent>
        {foods.map((food, index) => (
          <div key={`${mealType}-${index}`} className="mb-4">
            <Label htmlFor={`${mealType}-${food.name}`}>{food.name}</Label>
            <div className="flex items-center gap-2">
              <Input
                id={`${mealType}-${food.name}`}
                {...register(`${mealType}.${food.name}`, { valueAsNumber: true })}
                type="number"
                placeholder="0"
              />
              <span>g / {food.quantity.toFixed(1)}g</span>  
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
      <h1 className="text-2xl font-bold mb-4">记录今日摄入</h1>
      {mealPlan && Object.entries(mealPlan).map(([mealType, foods]) => 
        renderMealSection(mealType, foods)
      )}
      <Button type="submit" className="w-full">提交记录</Button>
    </form>
  );
}