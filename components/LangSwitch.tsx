import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useState } from "react";

export default function LanguageSwitch({
  lang,
  setLang,
}: {
  lang: string;
  setLang: Dispatch<SetStateAction<string>>;
}) {
  const LANG_LIST = ["English", "中文", "தமிழ்", "Bahasa Melayu"];

  return (
    <div className="flex">
      {LANG_LIST.map((item) => (
        <button
          key={item}
          className={cn(
            "px-3 py-2 text-sm font-medium hover:cursor-pointer my-5",
            item == lang && "bg-slate-200 rounded"
          )}
          onClick={() => setLang(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
