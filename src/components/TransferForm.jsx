import { useState } from "react";

function TransferForm({ balance, setBalance, transactions, setTransactions }) {
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("DEBIT");
  const handleTransfer = () => {
    if (!toAccount || !amount) {
      setMessage("❌ Please fill all fields");
      return;
    }

    if (amount <= 0) {
      setMessage("❌ Amount must be greater than zero");
      return;
    }

    if (type === "DEBIT" && amount > balance) {
      setMessage("❌ Insufficient balance");
      return;
    }

    if (type === "DEBIT") {
      setBalance(balance - Number(amount));
    } else {
      setBalance(balance + Number(amount));
    }

    setTransactions([
      ...transactions,
      {
        to: toAccount,
        amount: Number(amount),
        type,
        date: new Date().toLocaleString(),
      },
    ]);

    setMessage(`✅ ${type} transaction successful`);

    setToAccount("");
    setAmount("");
    setType("DEBIT");
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title"> Transfer funds</h5>

        {message && <p className="alert alert-info"> {message} </p>}

        <div className="mb-3">
          <label className="form-label"> To Account </label>
          <input
            type="text"
            className="form-control"
            value={toAccount}
            onChange={(e) => setToAccount(e.target.value)}
          />

          <div className="mb-3">
            <label className="form-label">Transaction Type</label>
            <select
              className="form-select"
              value={type}
              onChange={(e) => setType(e.target.value)}>
              <option value="DEBIT">Debit</option>
              <option value="CREDIT">Credit</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label"> Amount </label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" onClick={handleTransfer}>
          Transfer
        </button>
      </div>
    </div>
  );
}

export default TransferForm;
