import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RocketIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import InformationForm from "./InformationForm";
import { usePathname } from "next/navigation";
import Link from "next/link";

const HeroContent = () => {
  const pathname = usePathname();
  const isStarted = pathname === "/start";

  return (
    <main className="flex min-h-screen flex-col gap-4 justify-center p-8 md:p-14">
      <AnimatePresence mode="wait">
        {!isStarted ? (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Introduction />
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="md:w-full"
          >
            <InformationForm />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

const Introduction = () => {
  return (
    <>
      <h1 className="text-8xl md:text-[15rem] font-medium font-sans text-orange-500">
        Diet.
      </h1>
      <div className="flex flex-col gap-4 mt-4 ml-2">
        <h2 className="font-light">给自己一个更健康的饮食</h2>
        <Link href="/start" passHref>
          <Button className="flex flex-row gap-1 w-32">
            <RocketIcon className="text-white" />
            开始使用
          </Button>
        </Link>
      </div>
    </>
  );
};

export default HeroContent;
