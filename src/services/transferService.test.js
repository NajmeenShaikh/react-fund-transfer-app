import assert from "node:assert/strict";
import test from "node:test";
import {
  applyTransfer,
  createTransaction,
  validateTransfer,
} from "./transferService.js";

test("validates a debit transfer", () => {
  const result = validateTransfer({
    balance: 5000,
    toAccount: " AC-458921 ",
    amount: "1250",
    type: "DEBIT",
  });

  assert.equal(result.valid, true);
  assert.equal(result.numericAmount, 1250);
  assert.equal(result.trimmedAccount, "AC-458921");
});

test("rejects empty destination account", () => {
  const result = validateTransfer({ balance: 5000, toAccount: " ", amount: "100", type: "DEBIT" });
  assert.equal(result.valid, false);
  assert.match(result.message, /destination account/i);
});

test("rejects zero and invalid amounts", () => {
  for (const amount of ["0", "-10", "abc"]) {
    const result = validateTransfer({ balance: 5000, toAccount: "AC-1", amount, type: "DEBIT" });
    assert.equal(result.valid, false);
  }
});

test("rejects debit above available balance", () => {
  const result = validateTransfer({ balance: 5000, toAccount: "AC-1", amount: "5000.01", type: "DEBIT" });
  assert.equal(result.valid, false);
  assert.match(result.message, /insufficient balance/i);
});

test("applies debit and credit balance changes", () => {
  assert.equal(applyTransfer(5000, 1250, "DEBIT"), 3750);
  assert.equal(applyTransfer(5000, 1250, "CREDIT"), 6250);
});

test("creates a successful transaction record", () => {
  const transaction = createTransaction({
    toAccount: "AC-458921",
    amount: 1250,
    type: "DEBIT",
    date: "2026-09-08T08:00:00.000Z",
  });

  assert.equal(transaction.to, "AC-458921");
  assert.equal(transaction.amount, 1250);
  assert.equal(transaction.type, "DEBIT");
  assert.equal(transaction.status, "SUCCESS");
  assert.equal(transaction.date, "2026-09-08T08:00:00.000Z");
  assert.match(transaction.id, /^TXN-/);
});
