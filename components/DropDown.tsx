import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectScrollable() {
  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a policy" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>AIA</SelectLabel>
          <SelectItem value="lpp">Lifetime Protector Plus</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

