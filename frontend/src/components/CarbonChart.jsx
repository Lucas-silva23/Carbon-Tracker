import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import '../styles/CarbonChart.css'; 

ChartJS.register(ArcElement, Tooltip, Legend);

const CarbonChart = ({ chartData }) => {
  const data = {
    labels: chartData.map(d => d.name),
    datasets: [
      {
        label: 'kg de CO2 Salvo',
        data: chartData.map(d => d.total_saved),
        backgroundColor: [
          '#00796B', 
          '#0277BD', 
          '#4DB6AC', 
          '#4FC3F7', 
          '#004D40', 
          '#01579B',
        ],
        borderColor: '#fff', 
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true, 
    plugins: {
      legend: {
        position: 'bottom', 
        labels: {
          color: '#263238', 
          padding: 20, 
          font: {
            size: 14,
            weight: '500',
          }
        }
      },
      tooltip: {
        backgroundColor: '#263238', 
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += context.parsed.toFixed(2) + ' kg';
            }
            return label;
          }
        }
      }
    }
  };

  return (
    <div className="carbon-chart-container">
      <h3>Carbono Reduzido por Hábito</h3>
      {chartData.length > 0 ? (
        // Wrapper para controlar o tamanho do gráfico
        <div className="chart-wrapper"> 
          <Doughnut data={data} options={options} />
        </div>
      ) : (
        <p>Adicione hábitos para ver seu gráfico!</p>
      )}
    </div>
  );
};

export default CarbonChart;