# React Fund Transfer Application

A production-style banking frontend demonstrating a realistic **fund-transfer business workflow** with validation, balance protection, transaction history, accessibility, automated tests and a service boundary ready for REST integration.

> **Portfolio role:** Business-workflow project supporting my React/BFSI frontend portfolio.

## 🎯 Business Workflow

**Enter transfer details → validate business rules → submit → process → show success/failure → record transaction**

The application simulates a digital banking transfer journey where a customer enters a destination account, chooses debit or credit, validates the amount and reviews transaction history.

## ✨ Key Engineering Features

- Debit and credit transfer handling
- Available-balance protection for debit transfers
- Destination-account and amount validation
- Transaction history with debit/credit filtering
- Loading, error and success states
- Reusable React components and controlled inputs
- Isolated transfer service layer
- Responsive Bootstrap UI
- Semantic HTML and keyboard-visible focus states
- Accessible status and error messaging
- Automated service tests with Node.js test runner
- GitHub Actions CI for lint, tests and production build

## 🏗️ Architecture

```text
React UI
   ↓
Application State
   ↓
Transfer Service
   ↓
Mock API / REST Boundary
   ↓
Banking Backend
```

Business rules are isolated in `src/services/transferService.js` rather than being embedded in the form component. This keeps the workflow easier to test and makes the UI less coupled to data-access concerns.

## 🔌 Production API Boundary

```text
GET  /accounts
GET  /transactions
GET  /beneficiaries
GET  /notifications
POST /transfers
```

The current implementation uses local/mock services so the project runs without credentials or external infrastructure. A production integration would move authorization, final validation, transaction limits, idempotency, audit logging and transaction execution to trusted backend services.

## 🧪 Testing

The service tests cover critical business rules:

- Valid debit transfers
- Empty destination account
- Zero, negative and invalid amounts
- Insufficient debit balance
- Debit/credit balance transitions
- Successful transaction creation

Run locally:

```bash
npm install
npm run dev
npm run lint
npm test
npm run build
```

## ♿ Accessibility

- Explicit labels for form controls
- Semantic landmarks and headings
- `role="status"` for loading/success feedback
- `role="alert"` for errors
- `aria-live` announcements for important state changes
- Accessible table headers
- Keyboard-visible focus styles
- Empty/error states that do not depend only on color

## 🔐 Security Boundary

This is a frontend portfolio simulation. It does not process real money or store credentials, tokens, customer PII or real financial data.

The frontend demonstrates business-rule handling, but production security controls must remain server-side.

## 💡 Interview Topics Demonstrated

This project gives concrete examples for discussing **component boundaries, controlled forms, business validation, derived transaction state, service-layer separation, API contracts, failure states, accessibility and testing strategy**.

## 👩‍💻 Author

**Najmeen Shaikh** — React UI Frontend Developer focused on React, TypeScript, JavaScript, REST APIs and BFSI / FinTech applications.
