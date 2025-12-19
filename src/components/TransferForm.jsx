import { useState } from "react";

function TransferForm({ balance, setBalance, transactions, setTransactions }) {
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleTransfer = () => {
    if (!toAccount || !amount) {
      setMessage("Please Fill All The Fields");
      return;
    }

    if (amount <= 0) {
      setMessage("Please Transfer Amount Greater than Zero!");
      return;
    }

    if (amount > balance) {
      setMessage("Insufficient Balance!");
      return;
    }

    //perform Transfer

    setBalance(balance - amount);

    //save transactions

    setTransactions([
      ...transactions,
      {
        toAccount: toAccount,
        amount: Number(amount),
        date: new Date().toLocaleString(),
      },
    ]);

    setMessage("✓ Transfer Sucessful!!");

    //Reset Form
    setToAccount("");
    setAmount("");
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
