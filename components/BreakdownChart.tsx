"use client";
import dynamic from "next/dynamic";
import "chart.js/auto";

// export class Assurance {
//   death: string;
//   total_permanent_disability: string;
//   critical_illness: string;
//   health: string;
//   accidental_death: string;
//   accidental_tpd: string;

//   constructor(
//     death: string,
//     total_permanent_disability: string,
//     critical_illness: string,
//     health: string,
//     accidental_death: string,
//     accidental_tpd: string
//   ) {
//     this.death = death;
//     this.total_permanent_disability = total_permanent_disability;
//     this.critical_illness = critical_illness;
//     this.health = health;
//     this.accidental_death = accidental_death;
//     this.accidental_tpd = accidental_tpd;
//   }
// }

// export class Policy  {
//   policy_name: string;

//   constructor(policy_name: string, sum_assured: Assurance) {
//     this.policy_name = policy_name;
//     this.sum_assured = sum_assured;
//   }
// }

// class Props {
//   policies: Policy[];
//   policyType: keyof Assurance;
// }

const PieChart = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Pie),
  { ssr: false }
);

const extractData = (policies: any, policyType: any) => {
  let policyNames = policies.map((x) => x.id);
  let policyValues = policies.map((x) => x[policyType]);

  return {
    labels: policyNames,
    datasets: [
      {
        label: policyType,
        data: policyValues,
      },
    ],
  };
};

export const BreakdownChart = ({ policies, policyType }: any) => {
  const dispData = extractData(policies, policyType);

  // console.log(dispData);

  let cam = 0;

  dispData.datasets.forEach((datas) =>
    datas.data.forEach((item: number) => (cam = cam + item))
  );

  console.log(cam);

  return (
    <div>
      {cam > 0 ? (
        <PieChart data={dispData} />
      ) : (
        <span className="py-5">No Coverage</span>
      )}
    </div>
  );
};
