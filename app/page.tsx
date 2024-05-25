"use client";

import { PolicyUpload } from "@/components/PolicyUpload";
import { BreakdownChart } from "@/components/BreakdownChart";
import { examplePolicies } from "@/sample_data/samplePolicies";
import MultiSelect from "@/components/DropDown";
import { CardVariable } from "../components/CardVariable";
import { PolicyCards } from "../components/PolicyCards";
import { useEffect, useState } from "react";
import LanguageSwitch from "@/components/LangSwitch";

export default function Home() {
  const [lang, setLang] = useState<string>("English");

  const [label, setLabel] = useState<any>();

  useEffect(() => console.log(label), [label]);

  return (
    <main className="p-24">
      <LanguageSwitch lang={lang} setLang={setLang} />
      <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl">
          Hi, Welcome to your Safety Net &#128075;
        </h1>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <PolicyUpload />
        </div>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:grid-cols-4 lg:text-left">
        <div className="col-start-1 row-start-1">
          <div className="p-4">
            <MultiSelect setData={setLabel} />
          </div>
          <BreakdownChart activePolicies={label} />
        </div>

        <div className="col-start-3 row-start-1 p-4 ">
          <PolicyCards />
        </div>
      </div>
    </main>
  );
}
