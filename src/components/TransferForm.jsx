import { useState } from "react";

function TransferForm({ balance, setBalance, transactions, setTransactions }) {
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [type, setType] = useState("DEBIT");

  const handleTransfer = () => {
    const numericAmount = Number(amount);
    const trimmedAccount = toAccount.trim();

    if (!trimmedAccount || !amount) {
      setMessageType("danger");
      setMessage("Please enter the destination account and amount.");
      return;
    }

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setMessageType("danger");
      setMessage("Amount must be greater than zero.");
      return;
    }

    if (type === "DEBIT" && numericAmount > balance) {
      setMessageType("danger");
      setMessage("Insufficient balance for this transfer.");
      return;
    }

    setBalance((currentBalance) =>
      type === "DEBIT"
        ? currentBalance - numericAmount
        : currentBalance + numericAmount
    );

    setTransactions((currentTransactions) => [
      ...currentTransactions,
      {
        id: `TXN-${Date.now()}`,
        to: trimmedAccount,
        amount: numericAmount,
        type,
        date: new Date().toISOString(),
        status: "SUCCESS",
      },
    ]);

    setMessageType("success");
    setMessage(`${type} transaction completed successfully.`);
    setToAccount("");
    setAmount("");
    setType("DEBIT");
  };

  return (
    <section className="card" aria-labelledby="transfer-heading">
      <div className="card-body">
        <h2 id="transfer-heading" className="h5 card-title">
          Transfer funds
        </h2>

        {message && (
          <div className={`alert alert-${messageType}`} role="status" aria-live="polite">
            {message}
          </div>
        )}

        <div className="mb-3">
          <label className="form-label" htmlFor="to-account">
            Destination account
          </label>
          <input
            id="to-account"
            type="text"
            className="form-control"
            value={toAccount}
            onChange={(event) => setToAccount(event.target.value)}
            placeholder="e.g. AC-458921"
            autoComplete="off"
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="transaction-type">
            Transaction type
          </label>
          <select
            id="transaction-type"
            className="form-select"
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            <option value="DEBIT">Debit</option>
            <option value="CREDIT">Credit</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="form-label" htmlFor="transfer-amount">
            Amount (INR)
          </label>
          <input
            id="transfer-amount"
            type="number"
            className="form-control"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            min="0.01"
            step="0.01"
            inputMode="decimal"
            aria-describedby="amount-help"
          />
          <div id="amount-help" className="form-text">
            Available balance: ₹{balance.toFixed(2)}
          </div>
        </div>

        <button type="button" className="btn btn-primary" onClick={handleTransfer}>
          Submit transfer
        </button>
      </div>
    </section>
  );
}

export default TransferForm;
