const INITIAL_TRANSACTIONS = [
  {
    id: "TXN-1001",
    to: "AC-458921",
    amount: 1250,
    type: "DEBIT",
    date: "2026-09-01T10:30:00.000Z",
    status: "SUCCESS",
  },
  {
    id: "TXN-1002",
    to: "AC-774210",
    amount: 5000,
    type: "CREDIT",
    date: "2026-09-03T14:15:00.000Z",
    status: "SUCCESS",
  },
];

export async function fetchTransactions() {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return [...INITIAL_TRANSACTIONS];
}
