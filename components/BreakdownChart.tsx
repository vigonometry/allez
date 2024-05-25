"use client"
import dynamic from 'next/dynamic';
import 'chart.js/auto';

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

class Props {
    policies: Policy[];
    policyType: keyof Assurance
}

const PieChart = dynamic(() => import('react-chartjs-2').then((mod) => mod.Pie), {ssr: false});

const extractData = (policies: Policy[], policyType: keyof Assurance) => {
    let policyNames = policies.map(x => (x.policy_name))
    let policyValues = policies.map(x => (x.sum_assured[policyType]))

    return {
        labels: policyNames,
        datasets: [
            {
              label: policyType,
              data: policyValues,
            },
        ],
    };
}


export const BreakdownChart = ({policies, policyType}: Props) => (
        <div>
            <PieChart data={extractData(policies, policyType)} />
        </div>
);
