function TransactionList({ transactions }) {
  if (transactions.length === 0) {
    return <p className="mt-5"> No transactions yet!! </p>;
  }

  return (
    <div className="mt-5">
      <div className="card">
        <h5 className="card-header">Transaction History </h5>

        <ul classname="list-group">
          {transactions.map((transcations, index) => (
            <li
              key={index}
              classname="list-group-item d-flex justify-content-between align-items-center">
              <span>{transactions.to}</span>
              <span className="text-danger"> - ₹ {transactions.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TransactionList;
