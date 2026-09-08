# React Fund Transfer Application

A production-style banking frontend demonstrating a realistic fund-transfer workflow with validation, balance management, transaction history, accessibility, automated tests, and a service layer ready for REST API integration.

> **Portfolio focus:** React frontend engineering for BFSI / FinTech applications.

## 🎯 Business Use Case

Simulates a digital banking transfer journey where a customer enters a destination account, selects debit or credit, validates the amount, submits the transaction, and reviews transaction history.

## ✨ Key Features

- Fund transfer workflow
- Debit and credit transaction handling
- Available-balance protection for debit transfers
- Destination-account and amount validation
- Transaction history with debit/credit filtering
- Loading, error, and success states
- Reusable React components
- Controlled form inputs
- Responsive Bootstrap UI
- Semantic HTML and accessible status messaging
- Keyboard-visible focus states
- Isolated transfer service layer
- Automated unit tests with Node.js test runner
- GitHub Actions CI for lint, tests, and production build

## 🛠️ Tech Stack

- React 19
- JavaScript ES6+
- React Hooks
- Vite
- Bootstrap 5
- HTML5 / CSS3
- ESLint
- Node.js built-in test runner
- GitHub Actions

## 🏗️ Architecture

```text
UI Components
      ↓
Application State
      ↓
Transfer Service
      ↓
Mock API / REST API
      ↓
Banking Backend
```

Business rules are isolated in `src/services/transferService.js`, keeping validation and balance transitions out of the form component and making the core workflow independently testable.

### Production API target

```text
GET  /accounts
GET  /transactions
GET  /beneficiaries
POST /transfers
GET  /notifications
```

## 🧪 Testing

The automated service tests cover:

- Valid debit transfers
- Empty destination account
- Zero, negative, and invalid amounts
- Insufficient debit balance
- Debit/credit balance transitions
- Successful transaction creation

### Commands

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

## 🔐 Security Notes

This is a frontend portfolio simulation. It does not process real money or sensitive banking credentials. Never commit API keys, passwords, tokens, customer PII, or real financial data.

## 🚀 Production Roadmap

- [ ] Migrate UI/domain models to TypeScript
- [ ] Replace mock API with authenticated REST APIs
- [ ] Add beneficiary management
- [ ] Add transfer confirmation / OTP workflow
- [ ] Add server-side validation and idempotency handling
- [ ] Add pending / success / failed transaction lifecycle
- [ ] Add React Testing Library component coverage
- [ ] Add E2E testing
- [ ] Add API retry and recovery strategy

## 👩‍💻 Author

**Najmeen Shaikh** — React UI Frontend Developer focused on React, TypeScript, JavaScript, REST APIs, and BFSI / FinTech applications.

GitHub: https://github.com/NajmeenShaikh
