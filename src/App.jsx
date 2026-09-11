import React, { useState, useMemo } from "react";
import { evaluateBorrower } from "./engine/rulesEngine";
import { PRESETS } from "./engine/presets";
import {
  ShieldCheck,
  AlertTriangle,
  XCircle,
  CheckCircle,
  ArrowRight,
  Printer,
} from "lucide-react";

export default function App() {
  const [formData, setFormData] = useState(PRESETS.priya);

  const loadPreset = (key) => {
    setFormData(PRESETS[key]);
  };

  const results = useMemo(() => {
    return evaluateBorrower(formData);
  }, [formData]);

  const { outputs, negotiationCard, confidence, confidenceNotes } = results;

  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        padding: "24px 16px",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Header */}
        <header
          style={{
            marginBottom: "24px",
            borderBottom: "2px solid #e2e8f0",
            paddingBottom: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "28px",
                  fontWeight: "800",
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                Borrower Copilot
              </h1>
              <p
                style={{
                  color: "#64748b",
                  margin: "4px 0 0 0",
                  fontSize: "14px",
                }}
              >
                Your advocate before walking into a lender. No login. No bureau
                pull.
              </p>
            </div>

            {/* Quick Test Presets */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#475569",
                }}
              >
                Load Scenario:
              </span>
              <button
                onClick={() => loadPreset("priya")}
                style={presetBtnStyle}
              >
                Priya (Salaried)
              </button>
              <button onClick={() => loadPreset("ravi")} style={presetBtnStyle}>
                Ravi (Kirana)
              </button>
              <button
                onClick={() => loadPreset("anita")}
                style={presetBtnStyle}
              >
                Anita (Gig Worker)
              </button>
            </div>
          </div>
        </header>

        {/* Confidence Banner */}
        <div
          style={{
            background: "#e0f2fe",
            border: "1px solid #bae6fd",
            borderRadius: "8px",
            padding: "10px 16px",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "13px",
          }}
        >
          <div>
            <strong>Assessment Confidence: {confidence}%</strong>
            {confidenceNotes.length > 0 && (
              <span style={{ marginLeft: "8px", color: "#0369a1" }}>
                ({confidenceNotes.join(", ")})
              </span>
            )}
          </div>
          <span style={{ color: "#0284c7" }}>
            Confidence widens with silence
          </span>
        </div>

        {/* Grid Layout: Form vs Outputs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {/* LEFT: Questionnaire */}
          <div
            style={{
              background: "#ffffff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "700",
                marginBottom: "16px",
                color: "#1e293b",
              }}
            >
              Borrower Details
            </h2>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              <div>
                <label style={labelStyle}>Loan Purpose</label>
                <select
                  value={formData.loanPurpose}
                  onChange={(e) =>
                    setFormData({ ...formData, loanPurpose: e.target.value })
                  }
                  style={inputStyle}
                >
                  <option value="wedding">Wedding / Social Event</option>
                  <option value="business_expansion">
                    Business Expansion / Stock
                  </option>
                  <option value="vehicle_ev">Commercial Vehicle / EV</option>
                  <option value="medical">Medical / Emergency</option>
                  <option value="general">Personal Consumption</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Target Loan Amount (₹)</label>
                <input
                  type="number"
                  value={formData.amountWanted}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      amountWanted: Number(e.target.value),
                    })
                  }
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Employment Profile</label>
                <select
                  value={formData.employmentType}
                  onChange={(e) =>
                    setFormData({ ...formData, employmentType: e.target.value })
                  }
                  style={inputStyle}
                >
                  <option value="salaried">
                    Salaried (MNC / Corporate / Govt)
                  </option>
                  <option value="self_employed">
                    Self Employed / Kirana / Trader
                  </option>
                  <option value="informal">
                    Informal / Gig Worker / Rider
                  </option>
                </select>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "8px",
                }}
              >
                <div>
                  <label style={labelStyle}>Net Income (₹/mo)</label>
                  <input
                    type="number"
                    value={formData.netMonthlyIncome}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        netMonthlyIncome: Number(e.target.value),
                      })
                    }
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Co-Applicant (₹/mo)</label>
                  <input
                    type="number"
                    value={formData.coApplicantIncome}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        coApplicantIncome: Number(e.target.value),
                      })
                    }
                    style={inputStyle}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "8px",
                }}
              >
                <div>
                  <label style={labelStyle}>Existing EMIs (₹/mo)</label>
                  <input
                    type="number"
                    value={formData.existingEmi}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        existingEmi: Number(e.target.value),
                      })
                    }
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Living Expenses (₹/mo)</label>
                  <input
                    type="number"
                    value={formData.householdExpenses}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        householdExpenses: Number(e.target.value),
                      })
                    }
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Adaptive Dynamic Fields */}
              {formData.employmentType === "self_employed" && (
                <div
                  style={{
                    background: "#f1f5f9",
                    padding: "10px",
                    borderRadius: "8px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.hasCollateral}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hasCollateral: e.target.checked,
                        })
                      }
                    />
                    Owns Unencumbered Property / Shop
                  </label>
                  {formData.hasCollateral && (
                    <input
                      type="number"
                      placeholder="Property Market Value (₹)"
                      value={formData.collateralValue}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          collateralValue: Number(e.target.value),
                        })
                      }
                      style={{ ...inputStyle, marginTop: "6px" }}
                    />
                  )}
                </div>
              )}

              {formData.employmentType === "informal" && (
                <div
                  style={{
                    background: "#fee2e2",
                    padding: "10px",
                    borderRadius: "8px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#991b1b",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.hasRecentBounces}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hasRecentBounces: e.target.checked,
                        })
                      }
                    />
                    Had EMI bounce in last 3 months
                  </label>
                  <input
                    type="number"
                    placeholder="High-rate app loan debt (₹)"
                    value={formData.predatoryLoanOutstanding}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        predatoryLoanOutstanding: Number(e.target.value),
                      })
                    }
                    style={{ ...inputStyle, marginTop: "6px" }}
                  />
                </div>
              )}

              <div>
                <label style={labelStyle}>Credit Score (if known)</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="number"
                    placeholder="e.g. 780"
                    disabled={!formData.creditScoreKnown}
                    value={formData.creditScore || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        creditScore: e.target.value
                          ? Number(e.target.value)
                          : null,
                      })
                    }
                    style={{ ...inputStyle, flex: 1 }}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        creditScoreKnown: !formData.creditScoreKnown,
                        creditScore: null,
                      })
                    }
                    style={{ ...presetBtnStyle, fontSize: "12px" }}
                  >
                    {formData.creditScoreKnown ? "Mark Unknown" : "Enter Score"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: The 4 Outputs (O1 - O4) */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {/* O1: Verdict */}
            <div
              style={{
                background:
                  outputs.verdict === "Borrow"
                    ? "#f0fdf4"
                    : outputs.verdict === "Borrow Less"
                      ? "#fffbeb"
                      : "#fef2f2",
                border: `2px solid ${outputs.verdict === "Borrow" ? "#22c55e" : outputs.verdict === "Borrow Less" ? "#f59e0b" : "#ef4444"}`,
                borderRadius: "12px",
                padding: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                {outputs.verdict === "Borrow" && (
                  <CheckCircle color="#16a34a" size={24} />
                )}
                {outputs.verdict === "Borrow Less" && (
                  <AlertTriangle color="#d97706" size={24} />
                )}
                {outputs.verdict === "Do not Borrow" && (
                  <XCircle color="#dc2626" size={24} />
                )}
                <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "800" }}>
                  O1: {outputs.verdict}
                </h3>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  color: "#334155",
                  lineHeight: "1.4",
                }}
              >
                {outputs.verdictReason}
              </p>
            </div>

            {/* O2: Maximum Amount Comparison */}
            <div style={cardStyle}>
              <h4 style={cardHeaderStyle}>
                O2: What You Can Carry vs Bank Sanction
              </h4>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                  marginTop: "8px",
                }}
              >
                <div
                  style={{
                    background: "#f8fafc",
                    padding: "12px",
                    borderRadius: "8px",
                    borderLeft: "4px solid #3b82f6",
                  }}
                >
                  <div style={{ fontSize: "12px", color: "#64748b" }}>
                    Bank May Sanction
                  </div>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#1e293b",
                    }}
                  >
                    ₹{outputs.lenderSanctionAmount.toLocaleString("en-IN")}
                  </div>
                  <div style={{ fontSize: "11px", color: "#64748b" }}>
                    Based on top-line FOIR
                  </div>
                </div>
                <div
                  style={{
                    background: "#f0fdf4",
                    padding: "12px",
                    borderRadius: "8px",
                    borderLeft: "4px solid #16a34a",
                  }}
                >
                  <div style={{ fontSize: "12px", color: "#15803d" }}>
                    Safe Carry Limit
                  </div>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#166534",
                    }}
                  >
                    ₹{outputs.safeBorrowerAmount.toLocaleString("en-IN")}
                  </div>
                  <div style={{ fontSize: "11px", color: "#15803d" }}>
                    Safeguards living expenses
                  </div>
                </div>
              </div>
              <div
                style={{ fontSize: "12px", color: "#475569", marginTop: "8px" }}
              >
                <strong>Recommendation:</strong> Use the{" "}
                <strong>Safe Carry Limit</strong>. Lenders will over-lend to
                earn interest.
              </div>
            </div>

            {/* O3: Fair Interest Rate & APR */}
            <div style={cardStyle}>
              <h4 style={cardHeaderStyle}>
                O3: Fair Rate & True APR (All-in Cost)
              </h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginTop: "8px",
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: "22px",
                      fontWeight: "800",
                      color: "#0f172a",
                    }}
                  >
                    {outputs.fairRateBand}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#64748b",
                      marginLeft: "6px",
                    }}
                  >
                    interest band
                  </span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "#0284c7",
                    }}
                  >
                    {outputs.aprBand}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#64748b",
                      marginLeft: "4px",
                    }}
                  >
                    All-In APR
                  </span>
                </div>
              </div>
              <p
                style={{
                  margin: "8px 0 0 0",
                  fontSize: "12px",
                  color: "#64748b",
                }}
              >
                *APR includes processing fees (1.0–2.0%) + 18% GST amortized
                over {outputs.recommendedTenureMonths} months.
              </p>
            </div>

            {/* O4: EMI Ceiling & Stress Test */}
            <div style={cardStyle}>
              <h4 style={cardHeaderStyle}>
                O4: Maximum Safe Monthly EMI & Stress Test
              </h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "8px",
                }}
              >
                <div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>
                    Ceiling Monthly Outflow
                  </div>
                  <div
                    style={{
                      fontSize: "22px",
                      fontWeight: "800",
                      color: "#0f172a",
                    }}
                  >
                    ₹{outputs.safeEmiCeiling.toLocaleString("en-IN")}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>
                    Tenure Target
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "#334155",
                    }}
                  >
                    {outputs.recommendedTenureMonths} Months
                  </div>
                </div>
              </div>

              {/* Stress Case Box */}
              <div
                style={{
                  marginTop: "12px",
                  background: outputs.stressCase.survivable
                    ? "#f1f5f9"
                    : "#fff1f2",
                  padding: "10px",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
              >
                <strong>Stress Case (+2% rate hike / 20% income dip):</strong>
                <div
                  style={{
                    color: outputs.stressCase.survivable
                      ? "#334155"
                      : "#be123c",
                    marginTop: "2px",
                  }}
                >
                  {outputs.stressCase.stressNote}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* THE NEGOTIATION CARD (One-Page Screen for Branch Negotiation) */}
        <div
          style={{
            marginTop: "32px",
            border: "2px dashed #94a3b8",
            borderRadius: "16px",
            padding: "24px",
            background: "#ffffff",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ShieldCheck size={28} color="#0284c7" />
              <div>
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "800" }}>
                  BORROWER NEGOTIATION CARD
                </h3>
                <span style={{ fontSize: "12px", color: "#64748b" }}>
                  Hold this screen up to your lender or DSA
                </span>
              </div>
            </div>
            <button
              onClick={() => window.print()}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                ...presetBtnStyle,
              }}
            >
              <Printer size={16} /> Print / Save PDF
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
              borderTop: "1px solid #f1f5f9",
              paddingTop: "16px",
            }}
          >
            <div>
              <div style={cardLabel}>Applicant Profile</div>
              <div style={cardValue}>{negotiationCard.profileSummary}</div>
            </div>
            <div>
              <div style={cardLabel}>Target Product</div>
              <div style={cardValue}>{negotiationCard.targetLoan}</div>
            </div>
            <div>
              <div style={cardLabel}>Fair Interest Rate</div>
              <div style={{ ...cardValue, color: "#0284c7" }}>
                {negotiationCard.fairRateQuote}
              </div>
            </div>
            <div>
              <div style={cardLabel}>Ceiling EMI</div>
              <div style={{ ...cardValue, color: "#16a34a" }}>
                {negotiationCard.maxEmiRule}
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "16px",
              background: "#f8fafc",
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: "700",
                color: "#334155",
                marginBottom: "4px",
              }}
            >
              Branch Discussion Leverage:
            </div>
            <div style={{ fontSize: "13px", color: "#0f172a" }}>
              • {negotiationCard.leveragePoints}
            </div>
            <div
              style={{ fontSize: "13px", color: "#0f172a", marginTop: "4px" }}
            >
              • {negotiationCard.aprDisclosure}
            </div>
            <div
              style={{ fontSize: "13px", color: "#b91c1c", marginTop: "4px" }}
            >
              • {negotiationCard.contingencyWarning}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Inline Styles for Zero-Config Setup
const labelStyle = {
  display: "block",
  fontSize: "12px",
  fontWeight: "600",
  color: "#475569",
  marginBottom: "4px",
};
const inputStyle = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
  fontSize: "14px",
  boxSizing: "border-box",
};
const cardStyle = {
  background: "#ffffff",
  padding: "16px",
  borderRadius: "12px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
};
const cardHeaderStyle = {
  margin: 0,
  fontSize: "14px",
  fontWeight: "700",
  color: "#475569",
};
const cardLabel = {
  fontSize: "11px",
  color: "#64748b",
  textTransform: "uppercase",
  fontWeight: "700",
};
const cardValue = {
  fontSize: "14px",
  fontWeight: "700",
  color: "#0f172a",
  marginTop: "2px",
};
const presetBtnStyle = {
  background: "#f1f5f9",
  border: "1px solid #cbd5e1",
  padding: "6px 12px",
  borderRadius: "6px",
  fontSize: "12px",
  fontWeight: "600",
  cursor: "pointer",
};
