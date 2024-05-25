import pdfplumber
from flask import Flask, request
from openai import OpenAI
import os

IS_TEST = True

TEST_DATA = [{
    "policy_name": "AIA Solitaire PA (II)",
    "sum_assured": {
        "death": "0",
        "total_permanent_disability": "0",
        "critical_illness": "0",
        "health": "0",
        "accidental_death": "100000",
        "accidental_tpd": "300000"
        }
    }, 
    {
    "policy_name": "AVIVA MyProtector-Term Plan",
    "sum_assured": {
        "death": "0",
        "total_permanent_disability": "20000",
        "critical_illness": "0",
        "health": "100000",
        "accidental_death": "0",
        "accidental_tpd": "300000"
         }
    }, 
    {
    "policy_name": "ManuLife ReadyProtect",
    "sum_assured": {
        "death": "300000",
        "total_permanent_disability": "0",
        "critical_illness": "100000",
        "health": "0",
        "accidental_death": "0",
        "accidental_tpd": "0"
         }
    }, 
    {
    "policy_name": "NTUC Income PA Assurance",
    "sum_assured": {
        "death": "0",
        "total_permanent_disability": "500000",
        "critical_illness": "0",
        "health": "0",
        "accidental_death": "0",
        "accidental_tpd": "0"
         }
    }
]

template_prompt = """
            I will be sending you a document of an insurance policy.

            The policy might have different

            I need to find out the values of the coverage for the following 6 benefits:
            1. Death Benefit
            The death benefit is a payout to the beneficiaries of the insured person in the event of their death. This benefit provides financial support to the insured person's family or dependents to cover expenses such as funeral costs, debts, and living expenses.

            2. Total Permanent Disability (TPD) Benefit
            The TPD benefit is provided when the insured person becomes totally and permanently disabled due to illness or injury and is unable to work in any occupation for which they are suited by education, training, or experience. This benefit helps cover the loss of income and additional expenses related to the disability.
            3. Critical Illness Benefit
            The critical illness benefit pays out a lump sum upon the diagnosis of a specified critical illness, such as cancer, heart attack, or stroke. This benefit helps cover the medical costs and other expenses associated with the treatment and recovery from the critical illness.

            4. Health Insurance Benefit
            Health insurance provides coverage for medical expenses incurred due to illnesses or injuries. It typically includes benefits such as hospitalisation, outpatient care, prescription drugs, and sometimes dental and vision care. The aim is to reduce the financial burden of healthcare costs.

            5. Accidental Death Benefit
            The accidental death benefit is a payout to the beneficiaries if the insured person dies as a result of an accident. This benefit is often an additional coverage option that supplements the standard death benefit, providing extra financial support in the case of an accidental death.

            6. Accidental Total Permanent Disability (TPD) Benefit
            The accidental TPD benefit provides a payout if the insured person becomes totally and permanently disabled as a result of an accident. This benefit is similar to the general TPD benefit but is specifically triggered by accidents rather than illnesses or other causes.

            These benefits cater to different needs and situations, providing financial support in various circumstances, from health issues to accidents and disabilities.

            Note that the insurance might not cover all the 5 coverages. If so, the value for the field is zero

            From the document find out the following information and return it in the following structure, where the fields in “<>” brackets are parsed from the document:

            {
            “sum_assured:” {
                “death”:”<value>”,
                “total_permanent_disability”:”<value>”,
                “critical_illness”:”<value>”,
                “health”:”<value>”,
                “accidental_death”:”<value>”,
                “accidental_tpd”:”<value>”
            }
            }

            Please check and verify that it is accurate based on from where in the document you can derive the value. Also only return the data without any unused text.
                
            The document is attached here:

            """

def extract_data(text: str):
    if IS_TEST:
        return TEST_DATA[0]
    
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    OPENAI_ORG = os.getenv('OPENAI_ORG')
    OPENAI_PROJECT = os.getenv('OPENAI_PROJECT')

    client = OpenAI(
        api_key=OPENAI_API_KEY,
        organization=OPENAI_ORG,
        project=OPENAI_PROJECT
    )

    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "user", "content": f'{template_prompt} {text}'}
        ]
    )
    return completion.choices[0].message

def parse_pdf(file):
    if IS_TEST:
        return ""
    
    with pdfplumber.open(file) as pdf:

        data_by_pages = {}

        for i, page in enumerate(pdf.pages):
            data_by_pages[i + 1] = page.extract_text()

        return data_by_pages
