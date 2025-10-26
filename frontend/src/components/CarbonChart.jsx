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
        // NOVA PALETA (Tons de verde e azul)
        backgroundColor: [
          '#00796B', // Verde Escuro
          '#0277BD', // Azul Escuro
          '#4DB6AC', // Verde Médio
          '#4FC3F7', // Azul Médio
          '#004D40', // Verde Mais Escuro
          '#01579B', // Azul Mais Escuro
        ],
        borderColor: '#fff', 
        borderWidth: 2,
        hoverOffset: 4, // Efeito leve ao passar o mouse
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true, // Mantém a proporção
    plugins: {
      legend: {
        position: 'bottom', // Legenda na parte de baixo
        labels: {
          color: '#263238', // Cor do texto
          padding: 20, // Espaçamento da legenda
          font: {
            size: 14,
            weight: '500',
          }
        }
      },
      tooltip: {
        backgroundColor: '#263238', // Fundo do tooltip
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