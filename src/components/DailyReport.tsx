import { useState, useEffect } from 'react';
import axios from 'axios';

interface Transaction {
  id: number;
  pack: { type: string };
  quantity: number;
  total_price: string;
  created_at: string;
}

interface DailyReportData {
  transactions: Transaction[];
  total_profit: number;
}

const DailyReport: React.FC = () => {
  const [report, setReport] = useState<DailyReportData>({ transactions: [], total_profit: 0 });

  useEffect(() => {
    axios.get('https://egg-inventory-backend.harmoneelabs.com//transactions/today')
      .then(response => setReport(response.data))
      .catch(error => console.error('Error fetching report:', error));
  }, []);

  console.log(report.transactions)

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Today's Report</h2>
      <p className="mb-4">Total Profit: ${report.total_profit.toFixed(2)}</p>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Pack Type</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {report.transactions.map(transaction => (
            <tr key={transaction.id}>
              <td className="border p-2">{transaction.pack.type}</td>
              <td className="border p-2">{transaction.quantity}</td>
              <td className="border p-2">${transaction.total_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DailyReport;