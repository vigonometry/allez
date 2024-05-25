import * as React from "react"

import {
  Card,
} from "@/components/ui/card"

interface CardVariableProps {
  title: string;
  description: string;
}

export function CardVariable({ title, description }: CardVariableProps) {
 
  const circleColorClass = description === '0' ? 'bg-red-400' : 'bg-green-400';

  return (
    <Card className="w-[250px]">
      <div className="flex items-center space-x-4 rounded-md p-4 bg-white">

        <span className={`flex h-6 w-6 rounded-full ${circleColorClass}`}></span>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium leading-none">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  );
}

