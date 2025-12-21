import { useState, useEffect } from "react";
import BalanceCard from "./components/BalanceCard.jsx";
import TransferForm from "./components/TransferForm.jsx";
import TransactionList from "./components/TransactionList.jsx";
import { fetchTransactions } from "./api/mockApi";

function App() {
  const [balance, setBalance] = useState(5000);

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions().then((data) => {
      setTransactions(data);
    });
  }, []);

  return (
    <div className="container mt-7">
      <h1 className="mb-5">Fund Transfer App</h1>
      <p> welcome to Fund Transfer Application !!</p>

      <BalanceCard balance={balance} />

      <TransferForm
        balance={balance}
        setBalance={setBalance}
        transactions={transactions}
        setTransactions={setTransactions}
      />

      <TransactionList transactions={transactions} />
    </div>
  );
}

export default App;
