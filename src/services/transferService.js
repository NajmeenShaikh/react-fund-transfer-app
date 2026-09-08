export function validateTransfer({ balance, toAccount, amount, type }) {
  const numericAmount = Number(amount);
  const trimmedAccount = toAccount.trim();

  if (!trimmedAccount || !amount) {
    return { valid: false, message: "Please enter the destination account and amount." };
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
  return type === "DEBIT" ? balance - amount : balance + amount;
}

export function createTransaction({ toAccount, amount, type, date = new Date().toISOString() }) {
  return {
    id: `TXN-${Date.now()}`,
    to: toAccount,
    amount,
    type,
    date,
    status: "SUCCESS",
  };
}
