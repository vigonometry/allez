import React, { useState } from 'react';
import MultipleSelector, { Option } from './ui/multiple-selector';
import { examplePolicies } from '../sample_data/samplePolicies'; 

const OPTIONS: Option[] = examplePolicies.map((policy) => ({
  label: policy.policy_name,
  value: policy.policy_name.toLowerCase().replace(/\s/g, '_'), 
}));

interface MultiSelectProps {
  setSelectedPolicies: (selected: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ setSelectedPolicies }) => {
  const handleSelectionChange = (selectedOptions: Option[]) => {
    const selectedValues = selectedOptions.map(option => option.value);
    setSelectedPolicies(selectedValues);
  };

  return (
    <div className="align-left">
      <MultipleSelector
        defaultOptions={OPTIONS}
        placeholder="Select Policies"
        onChange={handleSelectionChange}
      />
    </div>
  );
};

export default MultiSelect;