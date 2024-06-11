// // src/App.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import Chart from './components/Chart';
// import './App.css';

// function App() {
//     const [question, setQuestion] = useState('');
//     const [answer, setAnswer] = useState('');
//     const [chartData, setChartData] = useState({ labels: [], data: [] });

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const response = await axios.post('http://localhost:5000/api/query', { question });
//         setAnswer(response.data.answer);
//         setChartData(response.data.chart_data);
//     };

//     return (
//         <div className="App">
//             <h1>Chatbot</h1>
//             <form onSubmit={handleSubmit}>
//                 <input 
//                     type="text" 
//                     value={question} 
//                     onChange={(e) => setQuestion(e.target.value)} 
//                     placeholder="Ask a question" 
//                 />
//                 <button type="submit">Ask</button>
//             </form>
//             <h2>{answer}</h2>
//             {chartData.labels.length > 0 && <Chart chartData={chartData} />}
//         </div>
//     );
// }

// export default App;
import React, { useState } from 'react';
import axios from 'axios';
import Chart from './components/Chart';
import './App.css';

function App() {
    const [messages, setMessages] = useState([]);
    const [question, setQuestion] = useState('');
    const [chartData, setChartData] = useState({ labels: [], data: [] });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userMessage = { sender: 'user', text: question };
        setMessages([...messages, userMessage]);

        const response = await axios.post('http://localhost:5000/api/query', { question });
        const botMessage = { sender: 'bot', text: response.data.answer };
        setMessages([...messages, userMessage, botMessage]);
        setChartData(response.data.chart_data);
        setQuestion('');
    };

    return (
        <div className="App">
            <h1>Chatbot</h1>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender}>
                        {msg.text}
                    </div>
                ))}
                {chartData.labels.length > 0 && <Chart chartData={chartData} />}
            </div>
            <form onSubmit={handleSubmit}>
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
}

export default App;
