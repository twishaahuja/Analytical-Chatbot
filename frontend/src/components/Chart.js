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
                // beginAtZero: true,
                grid: {
                    drawBorder: true,
                    color: '#080808',
                },
                ticks:{
                    beginAtZero: true,
                    fontColor: 'white',
                    color: 'white',
                }
            },
            x: {
                // beginAtZero: true,
                grid: {
                    drawBorder: true,
                    color: '#080808',
                },
                ticks:{
                    beginAtZero: true,
                    fontColor: 'white',
                    color: 'white',
                }
            },
        },
    };
    
    return (
        <div className="chart-container">
            <Bar data={data} options={options} color='#fff'/>
        </div>
    );
};

export default ChartComponent;