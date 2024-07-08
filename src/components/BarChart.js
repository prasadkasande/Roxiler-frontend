import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data }) => {
  const labels = data.map(d => d.range);
  const counts = data.map(d => d.count);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Number of Items',
        data: counts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div>
      <h2>Bar Chart</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
