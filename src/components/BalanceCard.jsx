function BalanceCard({ balance }) {
  const formattedBalance = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(balance);

  return (
    <section className="card mb-4" aria-labelledby="balance-heading">
      <div className="card-body">
        <p className="text-muted mb-1">Available balance</p>
        <h2 id="balance-heading" className="mb-0">
          {formattedBalance}
        </h2>
      </div>
    </section>
  );
}

export default BalanceCard;
