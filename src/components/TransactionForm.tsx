import { useState, useEffect } from 'react';
import axios from 'axios';

interface Pack {
  id: number;
  type: string;
  price: number;
  stock_quantity: number;
}

interface TransactionFormProps {
  onTransactionAdded: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onTransactionAdded }) => {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [packId, setPackId] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/packs')
      .then(response => setPacks(response.data))
      .catch(error => console.error('Error fetching packs:', error));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/transactions', {
        pack_id: parseInt(packId),
        quantity: parseInt(quantity),
      });
      setPackId('');
      setQuantity('');
      onTransactionAdded();
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert('Failed to add transaction. Check stock.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Pack Type</label>
          <select
            value={packId}
            onChange={e => setPackId(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Pack</option>
            {packs.map(pack => (
              <option key={pack.id} value={pack.id}>
                {pack.type} (${pack.price})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            className="w-full p-2 border rounded"
            required
            min="1"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;