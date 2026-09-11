# 💳 Borrower Copilot

> **A client-side lending advocate for Indian borrowers.**

**Borrower Copilot** helps borrowers answer four critical questions before walking into a lender:

* **Should I borrow?**
* **How much is safe to borrow?**
* **What is a fair interest rate?**
* **What EMI should I accept?**

The application combines deterministic financial calculations with transparent lending rules to help users make more informed borrowing decisions.

---

## 🚀 Quickstart

The project can be running locally in **under 60 seconds**.

### Prerequisites

Make sure you have:

* **Node.js v18+**
* **npm**

### 1. Clone the repository

```bash
git clone <YOUR_REPO_LINK_HERE>
cd borrower-copilot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Open the application

Visit:

```text
http://localhost:5173
```

---

## 🏗️ Architecture

Borrower Copilot follows a clean separation between **business logic** and **UI rendering**.

```text
borrower-copilot/
│
├── src/
│   ├── engine/
│   │   ├── rulesEngine.js
│   │   │   └── Pure deterministic business logic
│   │   │      and financial calculations
│   │   │
│   │   └── presets.js
│   │       └── Canonical borrower profiles
│   │          (Priya, Ravi, Anita)
│   │
│   ├── App.jsx
│   │   └── Presentation UI
│   │      Dynamic forms
│   │      Borrowing analysis
│   │      Negotiation Card
│   │
│   └── main.jsx
│       └── React application entry point
│
├── .gitignore
├── package.json
└── README.md
<<<<<<< HEAD
=======
```

---

## 🧠 Core Components

### `rulesEngine.js`

Contains the application's **core financial and lending logic**.

The engine is designed to be:

* **Deterministic** — same inputs produce the same outputs
* **Pure** — calculations are independent of the UI
* **Testable** — business rules can be tested independently
* **Transparent** — lending recommendations can be explained to the borrower

Typical responsibilities include:

* EMI calculation
* Loan affordability analysis
* Borrowing capacity
* Interest-rate evaluation
* Debt-to-income analysis
* Safe EMI calculation
* Lending recommendations

---

### `presets.js`

Contains canonical borrower profiles used for testing and demonstration.

Example profiles:

* **Priya**
* **Ravi**
* **Anita**

These profiles make it easy to test the application with realistic borrower scenarios without manually entering every input.

---

### `App.jsx`

Responsible for the **presentation layer**.

It handles:

* Dynamic borrower input forms
* Displaying financial analysis
* Presenting recommendations
* Rendering the Negotiation Card
* Connecting user inputs with the rules engine

Business rules are kept outside the UI so that the presentation layer remains clean.

---

### `main.jsx`

The React application entry point responsible for mounting the application into the DOM.

---

## 💡 Key Features

### 1. Should I Borrow?

Evaluates the borrower's financial situation and determines whether taking on additional debt is financially reasonable.

### 2. How Much Is Safe?

Estimates a borrowing amount based on the borrower's income, existing obligations, and affordability constraints.

### 3. What Is a Fair Rate?

Helps borrowers understand whether the offered interest rate is reasonable relative to their financial profile.

### 4. What EMI Should I Accept?

Calculates an affordable EMI range so borrowers have a concrete number to use when negotiating with lenders.

---

## 🤝 Negotiation Card

Borrower Copilot provides a **Negotiation Card** that turns the financial analysis into actionable information for the borrower.

Instead of simply showing calculations, the borrower can walk into a lender with clear answers around:

```text
Maximum Safe Loan
        ↓
Affordable EMI
        ↓
Fair Interest Rate
        ↓
Negotiation Position
```

This makes the tool useful not only for financial planning but also during an actual lending conversation.

---

## 🎯 Design Principles

### Client-Side First

The application performs its calculations on the client side, keeping the borrower in control of their financial information.

### Deterministic Rules

Financial recommendations are generated using explicit rules rather than opaque or unpredictable decision-making.

### Separation of Concerns

Business logic is separated from React components:

```text
User Input
    │
    ▼
React UI
    │
    ▼
Rules Engine
    │
    ├── Financial Calculations
    ├── Affordability Rules
    ├── Rate Analysis
    └── EMI Analysis
    │
    ▼
Recommendation
    │
    ▼
Negotiation Card
```

### Explainability

The goal is not just to provide a number, but to help the borrower understand **why** that number is recommended.

---

## 🛠️ Tech Stack

| Technology | Purpose                            |
| ---------- | ---------------------------------- |
| React      | User interface                     |
| JavaScript | Application & financial logic      |
| Vite       | Development server & build tooling |
| HTML/CSS   | Presentation                       |
| Node.js    | Development environment            |


## 🔒 Privacy

Borrower Copilot is designed as a **client-side tool**.

Financial information entered into the application is processed locally by the application's business logic rather than requiring a backend lending service.

> **Important:** Borrower Copilot is an educational and decision-support tool. Its recommendations should not be treated as financial, legal, or lending advice.

---

## 🧪 Development

Start the development server:

```bash
npm run dev
```

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## 📁 Project Structure

```text
borrower-copilot/
│
├── src/
│   ├── engine/
│   │   ├── rulesEngine.js
│   │   └── presets.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## 🌟 Why Borrower Copilot?

Traditional lending experiences often focus on:

> **"How much can we lend you?"**

Borrower Copilot focuses on a different question:

> **"How much should you actually borrow?"**

