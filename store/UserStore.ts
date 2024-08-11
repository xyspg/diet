import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UserGoal = 'rabbit' | 'bird' | 'turtle'
type UserGender = 'male' | 'female' | 'undisclosed'

interface UserState {
  goal: UserGoal | null
  age: number | null
  height: number | null
  weight: number | null
  gender: UserGender | null
  setGoal: (goal: UserGoal) => void
  setAge: (age: number) => void
  setHeight: (height: number) => void
  setWeight: (weight: number) => void
  setGender: (gender: UserGender) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      goal: null,
      age: null,
      height: null,
      weight: null,
      gender: null,
      setGoal: (goal) => set({ goal }),
      setAge: (age) => set({ age }),
      setHeight: (height) => set({ height }),
      setWeight: (weight) => set({ weight }),
      setGender: (gender) => set({ gender }),
    }),
    {
      name: 'user-storage',
    }
  )
)