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

interface Option {
    label: string;
    value: string
}

const policyTypes : Option[] = [
    {
        label: 'Critical Illness',
        value: 'critical_illness'
    },
    {
        label: 'Total Permanent Disability (TPD)',
        value: 'total_permanent_disability'
    },
    {
        label: 'Accidental Death',
        value: 'accidnetal_death'
    },
    {
        label: 'Accidental TPD',
        value: 'accidental_tpd'
    },
    {
        label: 'Life Insurance',
        value: 'death'
    }
]

interface SelectProps {
    setSelectedCoverage: React.Dispatch<React.SetStateAction<string>>;
}

export function CoverageDropdown({setSelectedCoverage}: SelectProps) {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a coverage" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {policyTypes.map(x => (<SelectItem value={x.value} onChange={e => {console.log(setSelectedCoverage(e.target.value))}}>{x.label}</SelectItem>))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
