import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Message from './Message';
import ChartComponent from './ChartComponent';
import './Chat.css';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [question, setQuestion] = useState('');
    const messagesEndRef = useRef(null);

    // Function to scroll the chat window to the bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userMessage = { sender: 'user', text: question };
        setMessages(prevMessages => [...prevMessages, userMessage]);

        try {
            const response = await axios.post('http://localhost:5000/api/query', { question });
            const botMessage = { sender: 'bot', text: response.data.answer };
            setMessages(prevMessages => [...prevMessages, botMessage]);

            if (response.data.chart_data) {
                const chartMessage = { sender: 'bot', chartData: response.data.chart_data };
                setMessages(prevMessages => [...prevMessages, chartMessage]);
            }
        } catch (error) {
            console.error('Error fetching response:', error);
        }

        setQuestion('');
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                <h4 style={{paddingRight:250}}>Welcome to the analytical chatbot</h4>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <Message sender={msg.sender} text={msg.text} />
                        {msg.chartData && <ChartComponent chartData={msg.chartData} />}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="chat-form">
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask a question"
                />
                <button type="submit">Ask</button>
            </form>
        </div>
    );
};

export default Chat;
