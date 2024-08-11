'use client'
import React from 'react';
import {AnimatePresence, motion} from "framer-motion";
import {Loader} from "@/components/Loader";
import MealPlanner from "@/app/(home)/start/configure/MealPlanner";

const Page = () => {
  return (
    <div>
      <AnimatePresence>
          {/*<Loader alt="正在生成食谱..." />*/}
        <MealPlanner />
      </AnimatePresence>
    </div>
  );
};

export default Page;