
import React from 'react';
import MultipleSelector, { Option } from './ui/multiple-selector';

const OPTIONS: Option[] = [
  { label: 'AIA Life Insurance', value: 'aia' },
  { label: 'NTUC Income Insurance', value: 'ntuc' },
];

const MultiSelect = () => {
  return (
    <div className=" align-left ">
      <MultipleSelector
        defaultOptions={OPTIONS}
        placeholder="Select Policies"
       
      />
    </div>
  );
};

export default MultiSelect;
