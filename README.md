# Borrower Copilot

> A client-side lending advocate tool that empowers Indian borrowers to answer four critical questions before walking into a lender: **Should I borrow? How much is safe? What is a fair rate? What EMI should I accept?**


---

## 🚀 Quickstart (Runs in < 60 Seconds)

Ensure you have **Node.js (v18+)** installed.

```bash
# 1. Clone the repository
git clone <YOUR_REPO_LINK_HERE>
cd borrower-copilot

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev


Open http://localhost:5173 in your browser.

💡 What the App Delivers
O1 — The Verdict: Borrow, Borrow Less, or Don't Borrow (reaches a strict "Don't" on debt spirals).

O2 — True Affordability vs. Lender Sanction: Highlights the gap between what a bank will offer (top-line FOIR) versus what the borrower can safely carry (disposable cash surplus protection).

O3 — Fair Interest Rate & All-in APR: Computes transparent rate bands and accounts for processing fees and 18% GST per RBI retail disclosure guidelines.

O4 — Ceiling EMI & Stress Resilience: Validates cashflow resilience against a +200 bps interest hike or a -20% household income shock.

The Negotiation Card: A one-screen printable card the borrower can present directly to a branch manager or DSA.

🧪 Testing the 3 Canonical Personas
Use the "Load Scenario" buttons at the top of the app to populate and audit:

Priya (29, Bengaluru | MNC Software Engineer | CIBIL 780):

Request: ₹8,00,000 wedding personal loan.

Result: Borrow Less (₹5,00,000) to protect cash flow against non-productive consumption.

Ravi (42, Mysuru | Kirana Owner | No Bureau Score | ₹45L Property):

Request: ₹15,00,000 business expansion loan.

Result: Borrow via secured LAP (Loan Against Property) at 9.25%–10.75%, avoiding predatory 18–24% unsecured NBFC loans.

Anita (35, Hubballi | Delivery Rider | High-Cost Debt | Past Bounce):

Request: ₹1,50,000 for EV scooter.

Result: Don't Borrow via instant apps; advises debt restructuring and priority-sector/MFI green vehicle financing.

📂 Architecture & Separation of Concerns
The project cleanly decouples business rules from UI rendering:

borrower-copilot/
├── src/
│   ├── engine/
│   │   ├── rulesEngine.js    # Pure deterministic business logic & financial math
│   │   └── presets.js        # Canonical test case profiles (Priya, Ravi, Anita)
│   ├── App.jsx               # Presentation UI, dynamic forms & Negotiation Card
│   └── main.jsx              # React DOM mounting
├── .gitignore
├── package.json
└── README.md