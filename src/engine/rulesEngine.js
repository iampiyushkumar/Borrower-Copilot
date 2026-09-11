
export function calculateEmi(principal, annualRatePct, tenureMonths) {
  if (!principal || principal <= 0 || !tenureMonths || tenureMonths <= 0) return 0;
  const r = annualRatePct / 12 / 100;
  if (r === 0) return Math.round(principal / tenureMonths);
  const emi = (principal * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1);
  return Math.round(emi);
}

// Helper: Max Principal from available EMI
export function calculateMaxPrincipal(maxEmi, annualRatePct, tenureMonths) {
  if (!maxEmi || maxEmi <= 0 || !tenureMonths || tenureMonths <= 0) return 0;
  const r = annualRatePct / 12 / 100;
  if (r === 0) return Math.round(maxEmi * tenureMonths);
  const principal = (maxEmi * (Math.pow(1 + r, tenureMonths) - 1)) / (r * Math.pow(1 + r, tenureMonths));
  return Math.round(principal);
}

// Helper: Effective APR (including processing fee & GST)
export function calculateApr(ratePct, processingFeePct, tenureMonths) {
  const tenureYears = tenureMonths / 12;
  // Approximate RBI-style APR: Nominal Rate + Annualized Upfront Fee with 18% GST
  const feeWithGst = processingFeePct * 1.18;
  const annualizedFee = feeWithGst / tenureYears;
  return Number((ratePct + annualizedFee).toFixed(2));
}

export function evaluateBorrower(profile) {
  const {
    loanPurpose, // 'wedding', 'business_expansion', 'vehicle_ev', 'medical', 'general'
    amountWanted = 0,
    employmentType, // 'salaried', 'self_employed', 'informal'
    netMonthlyIncome = 0,
    coApplicantIncome = 0,
    existingEmi = 0,
    householdExpenses = 0,
    creditScoreKnown, // true / false
    creditScore = null, // e.g. 780 or null
    hasCollateral = false,
    collateralValue = 0,
    hasRecentBounces = false,
    predatoryLoanOutstanding = 0 // Loans at 25%+
  } = profile;

  const totalHouseholdIncome = netMonthlyIncome + coApplicantIncome;
  let confidence = 85; // baseline confidence percentage
  let confidenceNotes = [];

  if (!creditScoreKnown || creditScore === null) {
    confidence -= 20;
    confidenceNotes.push("Score unknown (+/- 2.5% rate uncertainty)");
  }

  // --- 1. PRODUCT & FAIR RATE CALCULATION (O3) ---
  let productType = "Personal Loan";
  let baseRateMin = 13.5;
  let baseRateMax = 16.0;
  let recommendedTenureMonths = 36;
  let processingFeePct = 1.5;
  let productStrategy = "";

  if (employmentType === "self_employed" && hasCollateral && collateralValue > 0) {
    productType = "Loan Against Property (LAP) / Secured Business";
    baseRateMin = 9.25;
    baseRateMax = 10.75;
    recommendedTenureMonths = 84; // 7 years
    processingFeePct = 1.0;
    productStrategy = "Leverage unencumbered shop/property. Reject unsecured NBFC loans at 18-24%.";
  } else if (employmentType === "salaried") {
    productType = "Unsecured Personal Loan";
    recommendedTenureMonths = loanPurpose === "wedding" ? 36 : 48;
    if (creditScore >= 750) {
      baseRateMin = 10.5;
      baseRateMax = 11.5;
      productStrategy = "Tier-1 salaried + Prime CIBIL. Negotiate zero foreclosure penalty.";
    } else if (creditScore >= 680) {
      baseRateMin = 12.0;
      baseRateMax = 14.0;
      productStrategy = "Standard prime rate. Compare public sector vs private banks.";
    } else {
      baseRateMin = 14.5;
      baseRateMax = 18.0;
      productStrategy = "High interest band due to risk profile.";
    }
  } else if (employmentType === "informal") {
    if (loanPurpose === "vehicle_ev") {
      productType = "Priority Sector Commercial 2W / EV Financing";
      baseRateMin = 13.0;
      baseRateMax = 16.0;
      recommendedTenureMonths = 30;
      processingFeePct = 2.0;
      productStrategy = "Apply via SIDBI/Priority Green 2W scheme or MFI. Hypothecate vehicle; avoid fintech apps.";
    } else {
      productType = "Microfinance / Group Loan";
      baseRateMin = 18.0;
      baseRateMax = 24.0;
      recommendedTenureMonths = 24;
    }
  }

  const midRate = (baseRateMin + baseRateMax) / 2;
  const aprMin = calculateApr(baseRateMin, processingFeePct, recommendedTenureMonths);
  const aprMax = calculateApr(baseRateMax, processingFeePct, recommendedTenureMonths);

  let bankFoirPct = 0.50;
  if (totalHouseholdIncome >= 100000) bankFoirPct = 0.60;
  else if (totalHouseholdIncome < 35000) bankFoirPct = 0.40;

  const bankMaxEmiCap = Math.max(0, (totalHouseholdIncome * bankFoirPct) - existingEmi);
  let lenderSanctionAmount = calculateMaxPrincipal(bankMaxEmiCap, midRate, recommendedTenureMonths);

  if (hasCollateral && collateralValue > 0) {
    const ltvCap = collateralValue * 0.55;
    lenderSanctionAmount = Math.min(lenderSanctionAmount, ltvCap);
  }

  // Safe Borrower Capacity (Cashflow based: Income - Living - Existing EMI)
  const actualLivingExpenses = householdExpenses > 0 ? householdExpenses : (totalHouseholdIncome * 0.45);
  const actualSurplus = Math.max(0, totalHouseholdIncome - actualLivingExpenses - existingEmi);
  
  // Safe EMI takes 60% of genuine surplus (retaining 40% for buffer)
  const safeEmiCap = Math.round(actualSurplus * 0.60);
  const safeBorrowerAmount = calculateMaxPrincipal(safeEmiCap, midRate, recommendedTenureMonths);

  // --- 3. VERDICT ENGINE (O1) ---
  let verdict = "Borrow";
  let verdictReason = "";
  let recommendedAmount = amountWanted;

  const currentDti = totalHouseholdIncome > 0 ? (existingEmi / totalHouseholdIncome) : 1;

  if (hasRecentBounces && predatoryLoanOutstanding > 0) {
    verdict = "Don't Borrow";
    verdictReason = `Active debt spiral detected. You have ₹${predatoryLoanOutstanding.toLocaleString('en-IN')} in high-interest (>25%) loans with recent bounces. Do not take fresh credit without debt consolidation.`;
    recommendedAmount = 0;
  } else if (currentDti > 0.45) {
    verdict = "Don't Borrow";
    verdictReason = `Your existing loan obligations consume ${(currentDti * 100).toFixed(0)}% of your monthly earnings. Adding another EMI risks default.`;
    recommendedAmount = 0;
  } else if (loanPurpose === "wedding" && amountWanted > safeBorrowerAmount) {
    verdict = "Borrow Less";
    recommendedAmount = Math.min(amountWanted, safeBorrowerAmount);
    verdictReason = `Wedding is a non-income-generating lifestyle expense. Taking ₹${amountWanted.toLocaleString('en-IN')} will stress your cashflow. Cap it at ₹${recommendedAmount.toLocaleString('en-IN')}.`;
  } else if (amountWanted > safeBorrowerAmount && safeBorrowerAmount > 0) {
    verdict = "Borrow Less";
    recommendedAmount = safeBorrowerAmount;
    verdictReason = `Lender may offer up to ₹${lenderSanctionAmount.toLocaleString('en-IN')}, but your true disposable buffer supports only ₹${safeBorrowerAmount.toLocaleString('en-IN')}.`;
  } else {
    verdict = "Borrow";
    verdictReason = `Loan is within safe cashflow limits (${((safeEmiCap / (totalHouseholdIncome || 1)) * 100).toFixed(0)}% surplus utilization) for an asset-building purpose.`;
  }
  
  const agreedEmi = calculateEmi(recommendedAmount, midRate, recommendedTenureMonths);
  
  // Stress Test: Rate + 200 bps OR Income Drops 20%
  const stressedEmi = calculateEmi(recommendedAmount, midRate + 2.0, recommendedTenureMonths);
  const stressedIncomeSurplus = Math.max(0, (totalHouseholdIncome * 0.80) - actualLivingExpenses - existingEmi);
  const stressSurvivable = stressedEmi <= stressedIncomeSurplus;

  return {
    outputs: {
      verdict,
      verdictReason,
      recommendedAmount,
      lenderSanctionAmount,
      safeBorrowerAmount,
      productType,
      fairRateBand: `${baseRateMin}% – ${baseRateMax}%`,
      aprBand: `${aprMin}% – ${aprMax}%`,
      recommendedTenureMonths,
      safeEmiCeiling: safeEmiCap,
      agreedEmi,
      stressCase: {
        stressedEmi,
        rateHike: "+2.0%",
        survivable: stressSurvivable,
        stressNote: stressSurvivable 
          ? `Manageable: Even if income falls 20%, your buffer can absorb the ₹${stressedEmi.toLocaleString('en-IN')} EMI.`
          : `High Danger: An income dip or rate hike leaves zero safety margin. Keep tenure longer to soften EMI.`
      }
    },
    negotiationCard: {
      profileSummary: `${employmentType.toUpperCase()} | Monthly Net: ₹${totalHouseholdIncome.toLocaleString('en-IN')}`,
      targetLoan: `₹${recommendedAmount.toLocaleString('en-IN')} (${productType})`,
      fairRateQuote: `${baseRateMin}% – ${baseRateMax}%`,
      aprDisclosure: `All-in APR: ${aprMin}% – ${aprMax}% (includes processing fee & GST)`,
      maxEmiRule: `₹${safeEmiCap.toLocaleString('en-IN')} / month`,
      leveragePoints: productStrategy,
      contingencyWarning: !stressSurvivable ? "Do NOT accept floating rates without a rate cap." : "Standard prepayment without penalty."
    },
    confidence: Math.max(45, confidence),
    confidenceNotes
  };
}