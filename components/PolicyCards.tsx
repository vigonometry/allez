

import React from 'react';
import { Card } from './ui/card';
import { CardVariable } from './CardVariable';

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

export const PolicyCards: React.FC<PolicyCardsProps> = ({ selectedPolicies = [], policies }) => {
  const attributeSums: { [key: string]: number } = {};

  const policiesToSum = selectedPolicies.length > 0 ? selectedPolicies : policies.map(policy => policy.policy_name.toLowerCase().replace(/\s/g, '_'));

  policiesToSum.forEach(policyName => {
    const policy = policies.find(policy => policy.policy_name.toLowerCase().replace(/\s/g, '_') === policyName);
    if (policy) {
      Object.entries(policy.sum_assured).forEach(([attribute, value]) => {
        attributeSums[attribute] = (attributeSums[attribute] || 0) + parseInt(value as string);
      });
    }
  });

  const greenCards: JSX.Element[] = [];
  const redCards: JSX.Element[] = [];

  Object.entries(attributeSums).forEach(([attribute, sum], index) => {
    const card = (
      <CardVariable
        key={index}
        title={attributeNames[attribute]}
        description={sum.toString()}
      />
    );
    if (sum === 0) {
      redCards.push(card);
    } else {
      greenCards.push(card);
    }
  });

  return (
    <div className="flex flex-wrap">
      <div className="p-2 col-start-1 row-start-1">
        <h2 className="text-xl font-semibold mb-4 h-10 p-5">Coverage</h2>
        {greenCards}
      </div>
      <div className="p-2 col-start-3 row-start-1">
        <h2 className="text-xl font-semibold mb-4 h-10 p-5">Recommendations</h2>
        {redCards}
      </div>
    </div>
  );
};

export default PolicyCards;
