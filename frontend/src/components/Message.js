import React from 'react';
import {Box} from '@mui/material';
import ChartComponent from './Chart';

function Message({ sender, text, chartData }) {
    const style = {
        marginBottom: '10px',
        padding: '15px',
        borderRadius: '15px',
        maxWidth: '80%',
        alignSelf: sender === 'bot' ? 'flex-start' : 'flex-end',
        textAlign: sender === 'bot' ? 'left' : 'right',
        backgroundColor: sender === 'bot' ? '#f0f0f0' : '#4caf50',
        color: sender === 'bot' ? '#000' : '#fff',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background-color 0.3s, color 0.3s',
        animation: 'fadeIn 0.3s ease',

    };

    return (
        <Box style={style}>
            <span>{text}</span>
            {chartData && chartData.labels && chartData.labels.length > 0 && (
                <Box marginTop="10px">
                    <ChartComponent chartData={chartData} />
                </Box>
            )}
        </Box>
    );
}

export default Message;