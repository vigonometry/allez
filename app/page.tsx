"use client";
import { PolicyUpload } from "@/components/PolicyUpload";
import { BreakdownChart } from "@/components/BreakdownChart";
// import { examplePolicies } from "@/sample_data/samplePolicies";
import MultiSelect from "@/components/DropDown";
import { PolicyCards } from "../components/PolicyCards";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import { CoverageDropdown } from "@/components/ComboBox";

export default function Home() {
  const [selectedPolicies, setSelectedPolicies] = useState<string[]>([]);
  const [selectedCoverage, setSelectedCoverage] = useState<string>("accidental_tpd");

  const [policiesD, setPoliciesD] = useState<any>([]);

  const { isPending, error, data } = useQuery({
    queryKey: ["policies-data"],
    queryFn: () =>
      fetch("http://localhost:5000/policies").then((res) => res.json()),
  });

  // useEffect(() => console.log(data), [data]);

  return (
    <main className="p-5 max-w-5xl mx-auto">
      <div className="w-full space-y-5 font-mono mt-10">
        <h1 className="scroll-m-20 font-extrabold tracking-tight lg:text-3xl text-slate-400">
          Hi, Welcome to RetireEZ &#128075;
        </h1>
        <div className="w-full pt-10 items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <PolicyUpload />
        </div>
      </div>

      <Separator className="my-10" />

      <div className="grid text-center lg:text-left mt-10 grid-cols-3 gap-3 mb-20">
        <div className="col-start-1 col-span-1 row-start-1 p-5">
          <div className="">
            <MultiSelect setSelectedPolicies={setSelectedPolicies} />
          </div>
          <div className="p-2">
          <CoverageDropdown setSelectedCoverage={setSelectedCoverage} />
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
              policyType={selectedCoverage}
            />
          )}
        </div>

        <div className="col-start-2 row-start-1 col-span-2">
          {data && (
            <PolicyCards selectedPolicies={selectedPolicies} policies={data} />
          )}
        </div>
      </div>
      <footer className="text-xs text-slate-400 font-semibold py-5">
        Created with 💖 by Allez Team
      </footer>
    </main>
  );
}
