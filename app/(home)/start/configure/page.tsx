'use client'
import React from 'react';
import {AnimatePresence, motion} from "framer-motion";
import {Loader} from "@/components/Loader";

const Page = () => {
  return (
    <div>
      <AnimatePresence>

          <Loader alt="正在生成食谱..." />
      </AnimatePresence>
    </div>
  );
};

export default Page;