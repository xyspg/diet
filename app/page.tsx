"use client"
import HeroContent from "@/app/(home)/HeroContent";
import {useHasMounted} from "@/lib/hooks";
import {Loader} from "@/components/Loader";
import {useMealPlanStore} from "@/store/MealPlanStore";
import {useRouter} from "next/navigation";


export default function Home() {
  const { meals } = useMealPlanStore()
  const router = useRouter()
  if (!useHasMounted()) return <Loader />

  if (meals.length !== 0) {
    router.push('/home')
  } else return <HeroContent />
  return null
}

