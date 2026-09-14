const TRANSFER_TYPES = new Set(["DEBIT", "CREDIT"]);

function createTransactionId() {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return `TXN-${globalThis.crypto.randomUUID()}`;
  }

  return `TXN-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function validateTransfer({ balance, toAccount, amount, type }) {
  const numericAmount = Number(amount);
  const trimmedAccount = typeof toAccount === "string" ? toAccount.trim() : "";

  if (!Number.isFinite(balance) || balance < 0) {
    return { valid: false, message: "Current balance is invalid." };
  }

  if (!trimmedAccount || amount === "" || amount === null || amount === undefined) {
    return { valid: false, message: "Please enter the destination account and amount." };
  }

  if (!TRANSFER_TYPES.has(type)) {
    return { valid: false, message: "Please select a valid transaction type." };
  }

  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    return { valid: false, message: "Amount must be greater than zero." };
  }

  if (type === "DEBIT" && numericAmount > balance) {
    return { valid: false, message: "Insufficient balance for this transfer." };
  }

  return { valid: true, numericAmount, trimmedAccount };
}

export function applyTransfer(balance, amount, type) {
  if (!Number.isFinite(balance) || !Number.isFinite(amount) || amount < 0) {
    throw new Error("Balance and amount must be finite non-negative numbers.");
  }

  if (!TRANSFER_TYPES.has(type)) {
    throw new Error("Invalid transaction type.");
  }

  const nextBalance = type === "DEBIT" ? balance - amount : balance + amount;

  if (nextBalance < 0) {
    throw new Error("Transfer would result in a negative balance.");
  }

  return nextBalance;
}

export function createTransaction({ toAccount, amount, type, date = new Date().toISOString() }) {
  if (!toAccount || !Number.isFinite(amount) || amount <= 0 || !TRANSFER_TYPES.has(type)) {
    throw new Error("Invalid transaction data.");
  }

  return {
    id: createTransactionId(),
    to: toAccount.trim(),
    amount,
    type,
    date,
    status: "SUCCESS",
  };
}
