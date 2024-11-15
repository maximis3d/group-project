"use client"

import { SelectRoot, SelectLabel, SelectTrigger, SelectValueText, SelectContent, SelectItem } from "@/components/ui/select";

export function GenderDD() {
  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];

  return (
    <SelectRoot size="md">
      <SelectLabel color="grey" mt="20px">Gender</SelectLabel>
      <SelectTrigger>
        <SelectValueText placeholder="Select your gender" color="grey"/>
      </SelectTrigger>
      <SelectContent>
        {genderOptions.map((option) => (
          <SelectItem 
            value={option.value}
            key={option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}