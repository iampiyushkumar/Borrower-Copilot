export const PRESETS = {
  priya: {
    name: "Priya (Bengaluru)",
    role: "Salaried MNC Software Engineer",
    loanPurpose: "wedding",
    amountWanted: 800000,
    employmentType: "salaried",
    netMonthlyIncome: 110000,
    coApplicantIncome: 0,
    existingEmi: 14000,
    householdExpenses: 28000, 
    creditScoreKnown: true,
    creditScore: 780,
    hasCollateral: false,
    collateralValue: 0,
    hasRecentBounces: false,
    predatoryLoanOutstanding: 0
  },
  ravi: {
    name: "Ravi (Mysuru)",
    role: "Self-Employed Kirana Store Owner",
    loanPurpose: "business_expansion",
    amountWanted: 1500000,
    employmentType: "self_employed",
    netMonthlyIncome: 60000, // mid of 40-80k cash
    coApplicantIncome: 18000, // wife's teaching income
    existingEmi: 0,
    householdExpenses: 30000,
    creditScoreKnown: false,
    creditScore: null,
    hasCollateral: true,
    collateralValue: 4500000, // unencumbered shop
    hasRecentBounces: false,
    predatoryLoanOutstanding: 0
  },
  anita: {
    name: "Anita (Hubballi)",
    role: "Informal Delivery Rider & Tailor",
    loanPurpose: "vehicle_ev",
    amountWanted: 150000,
    employmentType: "informal",
    netMonthlyIncome: 28000,
    coApplicantIncome: 0,
    existingEmi: 8000,
    householdExpenses: 16000,
    creditScoreKnown: true,
    creditScore: 610,
    hasCollateral: false,
    collateralValue: 0,
    hasRecentBounces: true,
    predatoryLoanOutstanding: 35000 // 3 app loans at 30%+
  }
};