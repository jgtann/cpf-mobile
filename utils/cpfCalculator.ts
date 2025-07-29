export type FormData = {
  age: number;
  years: number;
  oa: number;
  sa: number;
  ma: number;
};

export type CPFYearProjection = {
  year: number;
  age: number;
  oa: number;
  sa: number;
  ra: number;
  ma: number;
  total: number;
};

export function calculateCPFProjection(inputs: FormData): CPFYearProjection[] {
  const { age, years, oa, sa, ma } = inputs;

  // CPF interest rates
  const baseOAInterest = 0.025;
  const baseSMAInterest = 0.04;
  const extraInterest = 0.01;
  const maCap = 75500;

  const results: CPFYearProjection[] = [];

  let currOA = oa;
  let currSA = sa;
  let currMA = ma;
  let currRA = 0;

  for (let i = 0; i <= years; i++) {
    const currentAge = age + i;
    const year = new Date().getFullYear() + i;

    // ----- SA → RA at age 55 -----
    // Move SA to RA before interest is computed
    if (currentAge === 55) {
      currRA += currSA;
      currSA = 0;
    }

    // ----- Extra Interest Distribution -----
    let extraEligible = 60000;

    const extraFromOA = Math.min(currOA, 20000, extraEligible);
    extraEligible -= extraFromOA;

    const extraFromSA = Math.min(currSA, extraEligible);
    extraEligible -= extraFromSA;

    const extraFromMA = Math.min(currMA, extraEligible);

    // ----- Base + Extra Interest Calculations -----
    const oaInterest = currOA * baseOAInterest + extraFromOA * extraInterest;
    const saInterest = currSA * baseSMAInterest + extraFromSA * extraInterest;
    const maInterest = currMA * baseSMAInterest + extraFromMA * extraInterest;

    // Apply interest
    currOA += oaInterest;
    currSA += saInterest;
    currMA += maInterest;

    if (currentAge >= 55) {
      const raInterest = currRA * baseSMAInterest;
      currRA += raInterest;
    }

    // ----- MA Cap Handling -----
    if (currMA > maCap) {
      const overflow = currMA - maCap;
      currMA = maCap;
      currOA += overflow;
    }

    const total = currOA + currSA + currRA + currMA;

    results.push({
      year,
      age: currentAge,
      oa: parseFloat(currOA.toFixed(2)),
      sa: parseFloat(currSA.toFixed(2)),
      ra: parseFloat(currRA.toFixed(2)),
      ma: parseFloat(currMA.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
    });
  }

  return results;
}
