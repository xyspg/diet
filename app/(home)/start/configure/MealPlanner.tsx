import React, { useState, useEffect } from "react";
import { useUserStore } from "@/store/UserStore";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { foodDatabase } from "@/lib/data";
import {useMealPlanStore} from "@/store/MealPlanStore";
import {Loader} from "@/components/Loader";
import {useRouter} from "next/navigation";

type Food = "proteins" | "carbs" | "fats" | "vegetables";

const MealPlanner = () => {
  const { goal, age, height, weight, gender } = useUserStore();
  const { meals, setMeals } = useMealPlanStore();
  const router = useRouter()

  const [mealPlan, setMealPlan] = useState(null);
  // 计算基础代谢率

  const calculateBMR = () => {
    if (!weight || !height || !age) return 0;
    if (gender === "male") {
      return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else {
      return 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    }
  };

  const calculateTDEE = (bmr: number) => {
    // 假设中等活动水平，系数为1.55
    return bmr * 1.55;
  };

  const adjustCaloriesForGoal = (tdee: number) => {
    switch (goal) {
      case "rabbit":
        return tdee - 500; // 减重
      case "bird":
        return tdee; // 维持
      case "turtle":
        return tdee + 300; // 增重/增肌
      default:
        return tdee;
    }
  };

  const generateMealPlan = () => {
    const bmr = calculateBMR();
    const tdee = calculateTDEE(bmr);
    const targetCalories = adjustCaloriesForGoal(tdee);

    // 宏量营养素比例 (蛋白质:碳水:脂肪)
    const macroRatio = goal === "rabbit" ? [0.3, 0.4, 0.3] : [0.25, 0.5, 0.25];

    const proteinCalories = targetCalories * macroRatio[0];
    const carbCalories = targetCalories * macroRatio[1];
    const fatCalories = targetCalories * macroRatio[2];

    const proteinGrams = proteinCalories / 4;
    const carbGrams = carbCalories / 4;
    const fatGrams = fatCalories / 9;

    // 简单的食物选择算法
    const selectFood = (category: Food, targetGrams: number) => {
      let selected = [];
      let currentGrams = 0;
      while (currentGrams < targetGrams) {
        const food =
          foodDatabase[category][
            Math.floor(Math.random() * foodDatabase[category].length)
          ];
        const quantity = Math.min(100, targetGrams - currentGrams);
        selected.push({ ...food, quantity });
        currentGrams += quantity;
      }
      return selected;
    };

    const mealPlan = {
      breakfast: [
        ...selectFood("proteins", proteinGrams * 0.3),
        ...selectFood("carbs", carbGrams * 0.3),
      ],
      lunch: [
        ...selectFood("proteins", proteinGrams * 0.4),
        ...selectFood("carbs", carbGrams * 0.4),
        ...selectFood("vegetables", 200),
      ],
      dinner: [
        ...selectFood("proteins", proteinGrams * 0.3),
        ...selectFood("carbs", carbGrams * 0.3),
        ...selectFood("vegetables", 200),
      ],
      others: [...selectFood("fats", fatGrams)],
    };

    // @ts-ignore
    setMealPlan(mealPlan);
  };

  useEffect(() => {
    if (goal && age && height && weight && gender) {
      generateMealPlan();
    }
  }, [goal, age, height, weight, gender]);

  if (!mealPlan) {
    return <Loader />
  }

  const saveMealPlan = () => {
    setMeals([mealPlan]);
    router.push('/home')
  }

  return (
    <div className="grid gap-4 p-6 md:p-12">
      <h2 className="text-2xl font-bold">每日膳食计划</h2>
      {Object.entries(mealPlan).map(([meal, foods]) => (
        <Card key={meal}>
          <CardHeader>
            <CardTitle className="capitalize">{meal}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {/*//@ts-ignore*/}
              {foods.map(
                (
                  food: {
                    name: string;
                    quantity: number;
                    protein: number;
                    carbs: number;
                    fat: number;
                  },
                  index: React.Key,
                ) => (
                  <li key={index}>
                    {food.name} - {food.quantity.toFixed(2)}g (蛋白质:{" "}
                    {((food.protein * food.quantity) / 100).toFixed(1)}g, 碳水:{" "}
                    {((food.carbs * food.quantity) / 100).toFixed(1)}g, 脂肪:{" "}
                    {((food.fat * food.quantity) / 100).toFixed(1)}g)
                  </li>
                ),
              )}
            </ul>
          </CardContent>
        </Card>
      ))}
      <Button onClick={saveMealPlan}>保存膳食计划</Button>
      <Button onClick={generateMealPlan}>重新生成膳食计划</Button>
    </div>
  );
};

export default MealPlanner;
