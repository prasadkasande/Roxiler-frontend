import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsTable = ({ transactions, month }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    fetchFilteredTransactions();
  }, [month, page, search]);

  const fetchFilteredTransactions = async () => {
    try {
      const response = await axios.get(`/api/transactions?month=${month}&page=${page}&search=${search}`);
      setFilteredTransactions(response.data);
    } catch (error) {
      console.error('Error fetching filtered transactions', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search transactions"
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date of Sale</th>
            <th>Sold</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
              <td>{transaction.sold ? 'Yes' : 'No'}</td>
              <td>{transaction.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default TransactionsTable;
