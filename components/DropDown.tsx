import React, { useEffect, useState } from "react";
import MultipleSelector, { Option } from "./ui/multiple-selector";
import { useQuery } from "@tanstack/react-query";

interface MultiSelectProps {
  setSelectedPolicies: (selected: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ setSelectedPolicies }) => {
  const [optionsR, setOptions] = useState<any>();

  const { isPending, error, data } = useQuery({
    queryKey: ["policies-data-a"],
    queryFn: () =>
      fetch("http://localhost:5000/policies").then((res) => res.json()),
  });

  useEffect(() => {
    // console.log(data);
    if (data) {
      const OPTIONS: Option[] = data.map((policy: any) => ({
        label: policy.id,
        value: policy.id.toLowerCase().replace(/\s/g, "_"),
      }));

      setOptions(OPTIONS);
    }
  }, [data]);

  const handleSelectionChange = (selectedOptions: Option[]) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedPolicies(selectedValues);
  };

  return (
    <div className="align-left">
      {optionsR && (
        <MultipleSelector
          defaultOptions={optionsR}
          placeholder="Select Policies"
          onChange={handleSelectionChange}
        />
      )}
    </div>
  );
};

export default MultiSelect;
