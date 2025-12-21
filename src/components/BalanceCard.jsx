function BalanceCard({ balance }) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title">Current Balance {balance}</h2>
      </div>
    </div>
  );
}

export default BalanceCard;
