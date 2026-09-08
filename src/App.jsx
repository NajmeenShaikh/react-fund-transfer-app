import { useEffect, useState } from "react";
import BalanceCard from "./components/BalanceCard.jsx";
import TransferForm from "./components/TransferForm.jsx";
import TransactionList from "./components/TransactionList.jsx";
import { fetchTransactions } from "./api/mockApi.js";

const INITIAL_BALANCE = 5000;

function App() {
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadTransactions() {
      try {
        setIsLoading(true);
        setLoadError("");
        const data = await fetchTransactions();
        if (isMounted) setTransactions(data);
      } catch {
        if (isMounted) setLoadError("Unable to load transaction history.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadTransactions();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="container py-5">
      <header className="mb-4">
        <p className="text-uppercase text-muted small mb-1">Digital Banking</p>
        <h1 className="mb-2">Fund Transfer</h1>
        <p className="text-muted mb-0">
          Securely manage account transfers and review transaction activity.
        </p>
      </header>

      <BalanceCard balance={balance} />

      <TransferForm
        balance={balance}
        setBalance={setBalance}
        transactions={transactions}
        setTransactions={setTransactions}
      />

      {loadError && (
        <div className="alert alert-danger mt-4" role="alert">
          {loadError}
        </div>
      )}

      {isLoading ? (
        <div className="card mt-4" aria-live="polite">
          <div className="card-body">Loading transaction history…</div>
        </div>
      ) : (
        <TransactionList transactions={transactions} />
      )}
    </main>
  );
}

export default App;
