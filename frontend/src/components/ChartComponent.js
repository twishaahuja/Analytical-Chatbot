import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const ChartComponent = ({ chartData }) => {
    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Values',
                data: chartData.data,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };
    
    return (
        <div className="chart-container">
            <Bar data={data} options={options} />
        </div>
    );
};

export default ChartComponent;
