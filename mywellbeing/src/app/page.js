"use client"

import { Button } from "@chakra-ui/react"



import { HStack } from "@chakra-ui/react"
import {
  ProgressBar,
  ProgressLabel,
  ProgressRoot,
  ProgressValueText,
} from "@/components/ui/progress"



export default function Home() {
  return (
    <div>
    <h1>Hello world</h1>
    <Button>Button</Button>

    <ProgressRoot defaultValue={40} maxW="sm">
      <HStack gap="5">
        <ProgressLabel>Usage</ProgressLabel>
        <ProgressBar flex="1" />
        <ProgressValueText>40%</ProgressValueText>
      </HStack>
    </ProgressRoot>

    </div>
  )
}
