const data = {
    total_permanent_disability: 0,
    death: 0,
    critical_illness: 0,
    health_insurance: 0,
    accidental_death: 300000,
    accidental_tpd: 100000,
}

export async function GET(request: Request) {
    return Response.json(data)
}