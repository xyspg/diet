"use client";
import React from "react";
import NutritionCard from "./NutritionCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <div className="p-4 flex flex-col justify-evenly h-screen  ">
      <NutritionCard />
      <div className="flex flex-col gap-2">
        <Link href="/create" className='flex' passHref>
          <Button className='w-full'>开始记录</Button>
        </Link>
        <Link href="/start" className='flex' passHref>
          <Button variant="outline" className='w-full'>修改目标</Button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
