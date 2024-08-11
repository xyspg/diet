"use client";

import { Bird, Rabbit, Turtle } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/UserStore";
import {FormEvent, useEffect} from "react";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";

export default function Component() {
  const {
    goal,
    age,
    height,
    weight,
    gender,
    setGoal,
    setAge,
    setHeight,
    setWeight,
    setGender,
  } = useUserStore();

  const router = useRouter()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "保存成功"
    })
    if (goal && age && height && weight && gender) {
      router.push("/start/configure")
    }
  }
  return (
    <div className="relative flex-col items-start gap-8 flex">
      <form className="grid w-full items-start gap-6 shadow-md" onSubmit={handleSubmit}>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">个人信息</legend>
          <div className="grid gap-3">
            <Label htmlFor="model">目标</Label>
            <Select
              value={goal || undefined}
              onValueChange={(value: any) => setGoal(value)}
            >
              <SelectTrigger
                id="model"
                className="items-start [&_[data-description]]:hidden"
              >
                <SelectValue placeholder="选择一个目标"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rabbit">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <Rabbit className="size-5"/>
                    <div className="grid gap-0.5">
                      <p>
                        瘦身{" "}
                        <span className="font-medium text-foreground">
                          严格卡路里控制
                        </span>
                      </p>
                      <p className="text-xs" data-description>
                        快速有效地减重塑形。
                      </p>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="bird">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <Bird className="size-5"/>
                    <div className="grid gap-0.5">
                      <p>
                        均衡{" "}
                        <span className="font-medium text-foreground">
                          合理卡路里目标
                        </span>
                      </p>
                      <p className="text-xs" data-description>
                        在控制体重和享受美食间寻找平衡。
                      </p>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="turtle">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <Turtle className="size-5"/>
                    <div className="grid gap-0.5">
                      <p>
                        健康{" "}
                        <span className="font-medium text-foreground">
                          关注全面营养
                        </span>
                      </p>
                      <p className="text-xs" data-description>
                        注重营养均衡,培养良好的饮食习惯。
                      </p>
                    </div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="temperature">年龄</Label>
            <Input
              id="temperature"
              type="number"
              placeholder="18"
              value={age || ""}
              onChange={(e) => setAge(Number(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="height">身高 (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="170"
                value={height || ''}
                onChange={(e) => setHeight(Number(e.target.value))}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="weight">体重 (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="65"
                value={weight || ''}
                onChange={(e) => setWeight(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="gender">性别</Label>
            <Select value={gender || undefined} onValueChange={(value: any) => setGender(value)}>
              <SelectTrigger>
                <SelectValue placeholder="选择性别"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">男</SelectItem>
                <SelectItem value="female">女</SelectItem>
                <SelectItem value="undisclosed">不愿透露</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">提交</Button>
        </fieldset>
      </form>
    </div>
  );
}
