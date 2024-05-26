import * as React from "react";

import { Card } from "@/components/ui/card";
import { NumericFormat } from "react-number-format";

interface CardVariableProps {
  title: string;
  description: number;
}

export function CardVariable({ title, description }: CardVariableProps) {
  const circleColorClass =
    description === 0
      ? "bg-red-400"
      : Number(description) > 0 && Number(description) < 100000
      ? "bg-orange-400"
      : "bg-green-400";

  return (
    <Card className="w-[250px] max-w-xl">
      <div className="flex items-center space-x-4 rounded-md p-4 bg-white">
        <span
          className={`flex h-6 w-6 rounded-full ${circleColorClass}`}
        ></span>
        <div className="flex-1 space-y-1">
          <p className="text-sm text-left font-medium leading-none">{title}</p>
          <p className="text-sm text-left  text-muted-foreground">
            {/* {"$ (SGD) " + description} */}
            <NumericFormat
              value={description}
              prefix={"$ (SGD) "}
              thousandSeparator=","
            />
          </p>
        </div>
      </div>
    </Card>
  );
}
