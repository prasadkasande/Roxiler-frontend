import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ data }) => {
  const labels = data.map(d => d.category);
  const counts = data.map(d => d.count);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Number of Items',
        data: counts,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF6384',
          '#36A2EB',
        ],
      },
    ],
  };

  return (
    <div>
      <h2>Pie Chart</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
