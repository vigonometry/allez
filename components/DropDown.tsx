import React, { Dispatch, SetStateAction } from "react";
import MultipleSelector, { Option } from "./ui/multiple-selector";
import { examplePolicies } from "../sample_data/samplePolicies";

const OPTIONS: Option[] = examplePolicies.map((policy) => ({
  label: policy.policy_name,
  value: policy.policy_name.toLowerCase().replace(/\s/g, "_"),
}));

const MultiSelect = ({
  setData,
}: {
  setData: Dispatch<SetStateAction<any>>;
}) => {
  return (
    <div className=" align-left ">
      <MultipleSelector
        defaultOptions={OPTIONS}
        placeholder="Select Policies"
        onChange={(item) => setData(item)}
      />
    </div>
  );
};

export default MultiSelect;
