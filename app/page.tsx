
"use client";
import { PolicyUpload } from "@/components/PolicyUpload";
import { BreakdownChart} from "@/components/BreakdownChart";
import { examplePolicies } from "@/sample_data/samplePolicies";
import MultiSelect from "@/components/DropDown";
import { PolicyCards } from "../components/PolicyCards"
import React, { useState } from 'react';
import { DropdownMenu } from "@/components/ui/dropdown-menu";



export default function Home() {
  const [selectedPolicies, setSelectedPolicies] = useState<string[]>([]);

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

    <div className="mb-32 grid grid-cols-3 text-center lg:mb-0 lg:w-full lg:text-left">
      <div className="col-start-1 row-start-1 p-4">
      <h2 className="place-items-center text-xl font-semibold">Breakdown</h2>
      <div className="py-4">
        <div className="w-full flex-row">
          <MultiSelect setSelectedPolicies={setSelectedPolicies} />
          <DropdownMenu />
        </div>
      </div>
        <BreakdownChart policies={selectedPolicies.length === 0 ? examplePolicies : examplePolicies.filter(x => selectedPolicies.includes(x.policy_name.toLowerCase().replace(/\s/g, '_')))} policyType='accidental_death'/>
      </div>

        <div className="col-start-2 row-start-1 ">
        <PolicyCards selectedPolicies={selectedPolicies} policies={examplePolicies} />
        </div>
    </div>
    </main>
  );
}