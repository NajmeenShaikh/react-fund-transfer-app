function BalanceCard({ balance }) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Current Balance {balance}</h5>
      </div>
    </div>
  );
}

export default BalanceCard;
