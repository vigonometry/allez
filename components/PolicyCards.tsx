



import React from 'react';
import { Card } from './ui/card'; // Assuming you have a Card component
import { CardVariable } from './CardVariable'; // Assuming you have a CardVariable component
import { examplePolicies } from '../sample_data/samplePolicies';

const attributeNames: { [key: string]: string } = {
  death: "Life Insurance",
  total_permanent_disability: "Total Permanent Disability (TPD)",
  critical_illness: "Critical Illness",
  health: "Health",
  accidental_death: "Accidental Death",
  accidental_tpd: "Accidental TPD",
};

export const PolicyCards = () => {

  const attributeSums: { [key: string]: number } = {};

  examplePolicies.forEach(policy => {
    Object.entries(policy.sum_assured).forEach(([attribute, value]) => {
      attributeSums[attribute] = (attributeSums[attribute] || 0) + parseInt(value as string);
    });
  });

  return (
    <div className="flex flex-wrap">
    <div className=" grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Object.entries(attributeSums).map(([attribute, sum], index) => (
        <div key={index} className="p-4">
          <CardVariable
            title={attributeNames[attribute]}
            description={sum.toString()}
          />
        </div>
      ))}
    </div>
     </div>
    
  );
};

export default PolicyCards;
