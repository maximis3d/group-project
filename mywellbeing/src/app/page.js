"use client"

import Image from 'next/image';
import { Button } from "@chakra-ui/react"
import Link from 'next/link';



import { HStack } from "@chakra-ui/react"
import {
  ProgressBar,
  ProgressLabel,
  ProgressRoot,
  ProgressValueText,
} from "@/components/ui/progress"



export default function Home() {
  return (
    <div className="bodyContainer">
    
    <Image
          src="/logo.png"
          alt="MyWellBeing Logo"
          width={50}
          height={50}
          style={{ marginRight: '8px' }}
        />

    <h1>MyWellBeing</h1>


    <div className="navButtons flex space-x-4">
        <button className="mealsButton">Meals</button>
        <button className="healthButton">Health</button>
      </div>

      <Link href="/mealPlannerPage">
        <button>Meal Planner page</button>
      </Link>


    </div>
  )
}
