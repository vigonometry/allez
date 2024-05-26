"use client";
import { PolicyUpload } from "@/components/PolicyUpload";
import { BreakdownChart } from "@/components/BreakdownChart";
// import { examplePolicies } from "@/sample_data/samplePolicies";
import MultiSelect from "@/components/DropDown";
import { PolicyCards } from "../components/PolicyCards";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const [selectedPolicies, setSelectedPolicies] = useState<string[]>([]);

  const [policiesD, setPoliciesD] = useState<any>([]);

  const { isPending, error, data } = useQuery({
    queryKey: ["policies-data"],
    queryFn: () =>
      fetch("http://localhost:5000/policies").then((res) => res.json()),
  });

  // useEffect(() => console.log(data), [data]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl">
          Hi, Welcome to your Safety Net &#128075;
        </h1>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <PolicyUpload />
        </div>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:grid-cols-4 lg:text-left">
        <div className="col-start-1 row-start-1 p-4">
          <div className="p-4">
            <MultiSelect setSelectedPolicies={setSelectedPolicies} />
          </div>
          {data && (
            <BreakdownChart
              policies={
                selectedPolicies.length === 0
                  ? data
                  : data.filter((x) =>
                      selectedPolicies.includes(
                        x.id.toLowerCase().replace(/\s/g, "_")
                      )
                    )
              }
              policyType="critical_illness"
            />
          )}
        </div>

        <div className="col-start-3 row-start-1 p-4 ">
          {data && (
            <PolicyCards selectedPolicies={selectedPolicies} policies={data} />
          )}
        </div>
      </div>
    </main>
  );
}
