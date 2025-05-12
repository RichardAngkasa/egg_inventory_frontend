import { useState } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionTable from './components/TransactionTable';
import StockSummary from './components/StockSummary';
import DailyReport from './components/DailyReport';

function App() {
  const [refresh, setRefresh] = useState(0);

  const handleTransactionAdded = () => {
    setRefresh(refresh + 1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Egg Inventory</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <TransactionForm onTransactionAdded={handleTransactionAdded} />
          <StockSummary key={`stock-${refresh}`} />
        </div>
        <div>       
          <TransactionTable key={`table-${refresh}`} />
          <DailyReport key={`report-${refresh}`} />

        </div>
      </div>
    </div>
  );
}

export default App;