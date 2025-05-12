import { useState, useEffect } from 'react';
import axios from 'axios';

interface Transaction {
  id: number;
  pack: { type: string };
  quantity: number;
  total_price: string;
  created_at: string;
}

const TransactionTable: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    axios.get('https://egg-inventory-backend.harmoneelabs.com/transactions')
      .then(response => setTransactions(response.data))
      .catch(error => console.error('Error fetching transactions:', error));
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Pack Type</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Total Price</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td className="border p-2">{transaction.pack.type}</td>
              <td className="border p-2">{transaction.quantity}</td>
              <td className="border p-2">${transaction.total_price}</td>
              <td className="border p-2">
                {new Date(transaction.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;