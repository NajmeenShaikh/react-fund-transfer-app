import { useState } from "react";

function TransactionList({ transactions }) {
  const [filterType, setFilterType] = useState("All");

  const filteredTransactions =
    filterType === "All"
      ? transactions
      : transactions.filter((transaction) => transaction.type === filterType);

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));

  return (
    <section className="card mt-4" aria-labelledby="history-heading">
      <div className="card-body">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
          <h2 id="history-heading" className="h5 mb-0">
            Transaction history
          </h2>
          <label className="visually-hidden" htmlFor="transaction-filter">
            Filter transactions
          </label>
          <select
            id="transaction-filter"
            className="form-select"
            style={{ maxWidth: "180px" }}
            value={filterType}
            onChange={(event) => setFilterType(event.target.value)}
          >
            <option value="All">All transactions</option>
            <option value="DEBIT">Debits</option>
            <option value="CREDIT">Credits</option>
          </select>
        </div>

        {filteredTransactions.length === 0 ? (
          <p className="text-muted mb-0">No transactions found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <caption className="visually-hidden">Recent account transactions</caption>
              <thead>
                <tr>
                  <th scope="col">Transaction</th>
                  <th scope="col">Account</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                  <th scope="col" className="text-end">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => {
                  const isDebit = transaction.type === "DEBIT";
                  return (
                    <tr key={transaction.id}>
                      <td>{transaction.type}</td>
                      <td>{transaction.to}</td>
                      <td>{formatDate(transaction.date)}</td>
                      <td>
                        <span className="badge text-bg-success">{transaction.status}</span>
                      </td>
                      <td className={`text-end ${isDebit ? "text-danger" : "text-success"}`}>
                        {isDebit ? "−" : "+"} ₹{transaction.amount.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default TransactionList;
