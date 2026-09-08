# React Fund Transfer Application

A production-style banking frontend demonstrating a realistic fund-transfer workflow with validation, account balance management, transaction history, accessible UI patterns, and a service layer ready for REST API integration.

> **Portfolio focus:** React frontend engineering for BFSI / FinTech applications.

## 🎯 Business Use Case

This application simulates a digital banking transfer journey. A customer can enter a destination account, choose a debit or credit transaction, validate the amount against the available balance, submit the transaction, and review transaction history.

The project is intentionally designed around common banking frontend concerns: predictable state transitions, validation, transaction status, loading states, error handling, responsive UI, and accessibility.

## ✨ Key Features

- Fund transfer workflow
- Debit and credit transaction handling
- Available balance calculation
- Destination-account validation
- Positive amount validation
- Insufficient-balance protection for debits
- Transaction history with debit/credit filtering
- Transaction status display
- Loading and error states
- Reusable React components
- Controlled form inputs
- Responsive Bootstrap UI
- Semantic HTML and accessible form labels
- Keyboard-visible focus states
- Mock service layer that can be replaced by REST APIs

## 🛠️ Tech Stack

- React 19
- JavaScript (ES6+)
- React Hooks
- Vite
- Bootstrap 5
- HTML5 / CSS3
- ESLint

## 🏗️ Frontend Architecture

```text
src/
├── api/
│   └── mockApi.js
├── components/
│   ├── BalanceCard.jsx
│   ├── TransferForm.jsx
│   └── TransactionList.jsx
├── App.jsx
├── main.jsx
└── index.css
```

The component layer handles presentation and user interaction, while the API module isolates transaction retrieval so it can later be replaced with a real HTTP client without coupling network concerns to UI components.

### Target production API flow

```text
React Components
      ↓
Custom Hooks / Application State
      ↓
Service Layer
      ↓
REST API
      ↓
Banking Backend
```

Potential endpoints for a production backend:

- `GET /accounts`
- `GET /transactions`
- `GET /beneficiaries`
- `POST /transfers`
- `GET /notifications`

## ♿ Accessibility

The UI follows practical accessibility patterns including:

- Explicit labels connected to form controls
- Semantic `main`, `section`, `table`, and heading elements
- Screen-reader-friendly status messaging
- Keyboard-visible focus styles
- Accessible transaction table headers
- Empty and error states that do not rely only on color

## 🧪 Testing Strategy

Automated tests are the next engineering layer for this project. The intended test suite should cover:

- Required-field validation
- Invalid and zero/negative amounts
- Insufficient balance
- Successful debit transaction
- Successful credit transaction
- Transaction history filtering
- Loading and error states
- Accessible form controls

Recommended tooling: **Vitest + React Testing Library**.

## 🚀 Getting Started

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Run linting

```bash
npm run lint
```

## 🔐 Security Notes

This is a frontend portfolio simulation and does not process real money or sensitive banking credentials. Never commit API keys, passwords, tokens, customer PII, or real financial data.

## 📸 Screenshots

Add current screenshots here after the UI is finalized:

- Dashboard / balance
- Fund transfer form
- Validation state
- Transaction history

## 🔮 Production Roadmap

- [ ] Migrate UI and domain models to TypeScript
- [ ] Add REST API integration
- [ ] Add authentication and authorization flow
- [ ] Add beneficiary management
- [ ] Add transaction confirmation step
- [ ] Add pending / success / failed transaction states
- [ ] Add Vitest + React Testing Library coverage
- [ ] Add GitHub Actions CI
- [ ] Add stronger form schema validation
- [ ] Add API retry and error recovery

## 👩‍💻 Author

**Najmeen Shaikh** — React UI Frontend Developer focused on React, TypeScript, JavaScript, REST APIs, and BFSI / FinTech applications.

GitHub: https://github.com/NajmeenShaikh
