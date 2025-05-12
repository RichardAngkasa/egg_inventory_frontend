import { useState, useEffect } from 'react';
import axios from 'axios';

interface Pack {
  id: number;
  type: string;
  stock_quantity: number;
}

const StockSummary: React.FC = () => {
  const [packs, setPacks] = useState<Pack[]>([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/packs')
      .then(response => 
        (
          setPacks(response.data),
          console.log("packs:", packs)
        )
      )
      .catch(error => console.error('Error fetching packs:', error));
  }, []);



  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Stock Summary</h2>
      <ul>
        {packs.map(pack => (
          <li key={pack.id} className="mb-2">
            {pack.type}: {pack.stock_quantity} packs
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockSummary;