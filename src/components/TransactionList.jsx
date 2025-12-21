import { useState } from "react";

function TransactionList({ transactions }) {
  const [filterType, setFilterType] = useState("All");

  const filteredTransactions =
    filterType === "All"
      ? transactions
      : transactions.filter((txn) => txn.type === filterType);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title"> Transaction History </h5>

        <select
          className="form-select mb-3"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}>
          <option value="All"> All </option>
          <option value="DEBIT"> DEBIT </option>
          <option value="CREDIT"> CREDIT </option>
        </select>

        <ul className="list-group">
          {filteredTransactions.map((txn, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between">
              <span>
                {txn.type}-{txn.to}
              </span>
              <span
                className={
                  txn.type === "DEBIT" ? "text-danger" : "text-success"
                }>
                {txn.type === "DEBIT" ? "-" : "+"} ₹{txn.amount}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TransactionList;
