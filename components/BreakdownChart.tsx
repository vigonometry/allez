"use client";
import dynamic from "next/dynamic";
import "chart.js/auto";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export class Assurance {
  death: string;
  total_permanent_disability: string;
  critical_illness: string;
  health: string;
  accidental_death: string;
  accidental_tpd: string;

  constructor(
    death: string,
    total_permanent_disability: string,
    critical_illness: string,
    health: string,
    accidental_death: string,
    accidental_tpd: string
  ) {
    this.death = death;
    this.total_permanent_disability = total_permanent_disability;
    this.critical_illness = critical_illness;
    this.health = health;
    this.accidental_death = accidental_death;
    this.accidental_tpd = accidental_tpd;
  }
}

export class Policy {
  policy_name: string;
  sum_assured: Assurance;

  constructor(policy_name: string, sum_assured: Assurance) {
    this.policy_name = policy_name;
    this.sum_assured = sum_assured;
  }
}

// class Props {
//     policies: Policy[];
//     policyType: keyof Assurance
// }

const PieChart = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Pie),
  { ssr: false }
);

const extractData = (policies: any, data: any) => {
  data = data.policies;

  //   console.log(policies);

  let policyNames = policies.map((x: any) => x.label);

  const dataFIlteredTemp: any = [];

  policies.forEach((policy: { label: string; value: string }) => {
    data.forEach(
      (dataItem: {
        accidental_death: number;
        accidental_tpd: number;
        critical_illness: number;
        death: number;
        health: number;
        id: string;
        total_permanent_disability: number;
      }) => {
        if (policy.label == dataItem.id) dataFIlteredTemp.push(dataItem);
      }
    );
  });

  dataFIlteredTemp;

  const polAD = dataFIlteredTemp.map((item: any) => item.accidental_death);
  const polATPD = dataFIlteredTemp.map((item: any) => item.accidental_tpd);
  const polCI = dataFIlteredTemp.map((item: any) => item.critical_illness);
  const polD = dataFIlteredTemp.map((item: any) => item.death);
  const polH = dataFIlteredTemp.map((item: any) => item.health);
  const polTPD = dataFIlteredTemp.map(
    (item: any) => item.total_permanent_disability
  );

  return {
    labels: policyNames,
    datasets: [
      {
        label: "Acidental Death",
        data: polAD,
      },
      {
        label: "Acidental ATPD",
        data: polATPD,
      },
      {
        label: "CI",
        data: polCI,
      },
      {
        label: "Death",
        data: polD,
      },
      {
        label: "Health",
        data: polH,
      },
      {
        label: "TPD",
        data: polTPD,
      },
    ],
  };
};

export const BreakdownChart = ({
  activePolicies = "AIA Solitaire PA (II)",
}: {
  activePolicies: any;
}) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["policies-data"],
    queryFn: () =>
      fetch("http://localhost:5000/policies").then((res) => res.json()),
  });

  //   useEffect(() => console.log(data), [data]);

  return (
    // <></>
    <div>
      {data && activePolicies ? (
        <PieChart data={extractData(activePolicies, data)} />
      ) : (
        <></>
      )}
    </div>
  );
};
