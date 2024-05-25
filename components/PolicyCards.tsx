"use client";

import React, { useEffect, useState } from "react";
import { Card } from "./ui/card"; // Assuming you have a Card component
import { CardVariable } from "./CardVariable"; // Assuming you have a CardVariable component
import { examplePolicies } from "../sample_data/samplePolicies";
import { useQuery } from "@tanstack/react-query";

const attributeNames: { [key: string]: string } = {
  death: "Life Insurance",
  total_permanent_disability: "Total Permanent Disability (TPD)",
  critical_illness: "Critical Illness",
  health: "Health",
  accidental_death: "Accidental Death",
  accidental_tpd: "Accidental TPD",
};

export const PolicyCards = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["policies-data"],
    queryFn: () =>
      fetch("http://localhost:5000/policies").then((res) => res.json()),
  });

  const [attributes, setAttributes] = useState<any>();

  useEffect(() => {
    if (data) {
      const attributeSums: { [key: string]: number } = {};

      data["policies"].forEach((policy: any) => {
        Object.entries(policy).forEach(([attribute, value]) => {
          attributeSums[attribute] =
            (attributeSums[attribute] || 0) + parseInt(value as string);
        });
      });

      setAttributes(attributeSums);
    }
  }, [data]);

  return (
    <div className="flex flex-wrap">
      <div className=" grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {attributes &&
          Object.entries(attributes).map(
            ([attribute, sum]: any, index: number) => (
              <div key={index} className="p-4">
                <CardVariable
                  title={attributeNames[attribute]}
                  description={sum.toString()}
                />
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default PolicyCards;
