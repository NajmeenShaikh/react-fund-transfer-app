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

test("rejects invalid transaction types", () => {
  const result = validateTransfer({ balance: 5000, toAccount: "AC-1", amount: "100", type: "TRANSFER" });
  assert.equal(result.valid, false);
  assert.match(result.message, /valid transaction type/i);
});

test("rejects invalid balances", () => {
  for (const balance of [-1, Number.NaN, Number.POSITIVE_INFINITY]) {
    const result = validateTransfer({ balance, toAccount: "AC-1", amount: "100", type: "DEBIT" });
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

test("rejects invalid balance transitions", () => {
  assert.throws(() => applyTransfer(1000, 1500, "DEBIT"), /negative balance/i);
  assert.throws(() => applyTransfer(Number.NaN, 100, "DEBIT"), /finite/i);
  assert.throws(() => applyTransfer(1000, 100, "TRANSFER"), /Invalid transaction type/i);
});

test("creates normalized successful transaction records with unique IDs", () => {
  const first = createTransaction({
    toAccount: " AC-458921 ",
    amount: 1250,
    type: "DEBIT",
    date: "2026-09-08T08:00:00.000Z",
  });
  const second = createTransaction({
    toAccount: "AC-774210",
    amount: 500,
    type: "CREDIT",
    date: "2026-09-08T08:01:00.000Z",
  });

  assert.equal(first.to, "AC-458921");
  assert.equal(first.amount, 1250);
  assert.equal(first.type, "DEBIT");
  assert.equal(first.status, "SUCCESS");
  assert.equal(first.date, "2026-09-08T08:00:00.000Z");
  assert.match(first.id, /^TXN-/);
  assert.notEqual(first.id, second.id);
});

test("rejects invalid transaction creation data", () => {
  assert.throws(
    () => createTransaction({ toAccount: "AC-1", amount: 0, type: "DEBIT" }),
    /Invalid transaction data/i
  );
  assert.throws(
    () => createTransaction({ toAccount: "AC-1", amount: 100, type: "TRANSFER" }),
    /Invalid transaction data/i
  );
});
