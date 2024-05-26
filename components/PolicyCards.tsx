import React from "react";
import { Card } from "./ui/card";
import { CardVariable } from "./CardVariable";

import { NumericFormat } from "react-number-format";

const attributeNames: { [key: string]: string } = {
  death: "Life Insurance",
  total_permanent_disability: "Total Permanent Disability (TPD)",
  critical_illness: "Critical Illness",
  health: "Health",
  accidental_death: "Accidental Death",
  accidental_tpd: "Accidental TPD",
};

interface PolicyCardsProps {
  selectedPolicies?: string[];
  policies: any[];
}

export const PolicyCards: React.FC<PolicyCardsProps> = ({
  selectedPolicies = [],
  policies,
}) => {
  const attributeSums: { [key: string]: number } = {};

  const policiesToSum =
    selectedPolicies.length > 0
      ? selectedPolicies
      : policies.map((policy) => policy.id.toLowerCase().replace(/\s/g, "_"));

  policiesToSum.forEach((policyName) => {
    const policy = policies.find(
      (policy) => policy.id.toLowerCase().replace(/\s/g, "_") === policyName
    );

    if (policy) {
      console.log(policy);
      Object.entries(policy).forEach(([attribute, value]) => {
        if (attribute != "id") {
          attributeSums[attribute] =
            (attributeSums[attribute] || 0) + parseInt(value as string);
        }
      });
    }
  });

  const greenCards: JSX.Element[] = [];
  const orangeCards: JSX.Element[] = [];
  const redCards: JSX.Element[] = [];

  Object.entries(attributeSums).forEach(([attribute, sum], index) => {
    const card = (
      <div key={index} className="m-4">
        <CardVariable title={attributeNames[attribute]} description={sum} />
      </div>
    );

    console.log(attribute, sum);
    if (sum === 0) {
      redCards.push(card);
    } else if (0 < sum && sum < 100000) {
      orangeCards.push(card);
    } else {
      if (!Number.isNaN(sum)) greenCards.push(card);
    }
  });

  return (
    <div className="grid grid-cols-2 gap-3 p-5">
      <div className="flex-1">
        <h2 className="place-items-center text-xl font-semibold">Coverage</h2>
        <p className="text-sm text-slate-400 mt-3">
          Congrats! You are covered for the value of the sum assured for the
          following benefits.
        </p>
        <div className="flex flex-wrap mt-2">{greenCards} {orangeCards}</div>
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-semibold">Recommendations</h2>
        <p className="text-sm text-slate-400 mt-3">
          Oh no. You are not insured for the following benefits. Consider
          scheduling a chat with a financial advisor.
        </p>
        <div className="flex flex-wrap mt-2">{redCards}</div>
      </div>
    </div>
  );
};

export default PolicyCards;
