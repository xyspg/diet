"use client"
import HeroContent from "@/app/(home)/HeroContent";
import {useHasMounted} from "@/lib/hooks";

export default function Home() {
  if (!useHasMounted()) return null

  return (
    <HeroContent />
  );
}
