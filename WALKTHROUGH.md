# WALKTHROUGH.md — Architectural Decisions & Product Trade-offs

### 1. Architecture & Design Philosophy (2-Minute Overview)
* **Decoupled Deterministic Engine:** All lending domain logic resides inside `src/engine/rulesEngine.js` with zero dependencies on React or UI state. This ensures any policy rule can be tested, unit-tested, or modified live during an evaluation without component refactoring.
* **Zero-Storage Privacy:** No user inputs, CIBIL queries, or device data are stored in localStorage, cookies, or remote databases. Computation is instantaneous and entirely client-side.
* **Borrower-First Asymmetry:** Standard banking tools calculate maximum sanction (top-line FOIR) to maximize interest earnings. Our engine defaults to **Safe Disposable Surplus**, ensuring living costs and contingencies are deducted first.

---

### 2. Handling of Canonical Personas
* **Priya (Salaried / High CIBIL):** Handled lifestyle risk. Despite having a ₹14L sanction eligibility, she is restricted to a **Borrow Less** verdict (₹5L cap) because wedding expenditures offer zero commercial return and high opportunity cost.
* **Ravi (Self-Employed / No CIBIL):** Handled informational opacity. Rather than penalizing him for having no bureau score with a 20%+ NBFC interest quote, the engine leverages his unencumbered ₹45L shop premises to steer him into a secured Loan Against Property (LAP) at 9.25%–10.75%.
* **Anita (Informal / Distressed Credit):** Handled predatory debt. Triggered an explicit **Don't Borrow** verdict to stop loan stacking, while giving her a viable route forward via secured commercial EV priority schemes instead of private digital apps.

---

### 3. What I Would Build Next (Product Roadmap)
* **Account Aggregator (AA) Integration:** Optional consent-based AA pull to parse 6-month bank cashflows automatically, replacing self-reported income and expense inputs.
* **Sanction Letter OCR Scanner:** An upload tool allowing borrowers to upload an initial sanction letter or loan sheet. The engine would scan for hidden fees, flat vs reducing rate trickery, and auto-populate the Negotiation Card against that specific lender.
* **Vernacular Language Support:** Audio-assisted and multi-language UI (Hindi, Kannada, Tamil, Marathi) to make the tool accessible to non-English kirana operators and gig-economy workers.

---

### 4. What I Would Cut (Pruning Scope)
* **Credit Score Number Input Slider:** Self-reported 3-digit CIBIL scores are frequently inaccurate or outdated. A binary questionnaire ("Have you had any loan bounces in 24 months? Do you carry active credit card debt?") serves as a more reliable proxy.
* **Complex Multi-Variant Tenure Selectors:** Micro-adjusting tenure by months adds cognitive friction. Standardizing to 3 fixed buckets (Short: 24m, Medium: 36m, Long: 84m) simplifies decision-making without degrading affordability math.