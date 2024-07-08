import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionsTable from './components/TransactionTable'
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
// import './styles/App.css';

const App = () => {
  const [month, setMonth] = useState('01');
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [month]);

  const fetchData = async () => {
    try {
      const [transactionsRes, statisticsRes, barChartRes, pieChartRes] = await Promise.all([
        axios.get(`/api/transactions?month=${month}`),
        axios.get(`/api/statistics?month=${month}`),
        axios.get(`/api/bar-chart?month=${month}`),
        axios.get(`/api/pie-chart?month=${month}`),
      ]);

      setTransactions(transactionsRes.data);
      setStatistics(statisticsRes.data);
      setBarChartData(barChartRes.data);
      setPieChartData(pieChartRes.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  return (
    <div className="App">
      <h1>Transactions Dashboard</h1>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03">March</option>
        <option value="04">April</option>
        <option value="05">May</option>
        <option value="06">June</option>
        <option value="07">July</option>
        <option value="08">August</option>
        <option value="09">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
      <TransactionsTable transactions={transactions} month={month} />
      <Statistics statistics={statistics} />
      <BarChart data={barChartData} />
      <PieChart data={pieChartData} />
    </div>
  );
};

export default App;
