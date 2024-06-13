import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Typography, List, ListItem, 
     ListItemText, TextField, Button,
     Paper, Divider, Box, useMediaQuery, CssBaseline
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './styles.css';
import Message from './components/Message';
import Header from './components/Header';
import SendIcon from '@mui/icons-material/Send';


const theme = createTheme({
    palette: {
        primary: {
            main: '#333333',
        },
        secondary: {
            main: '#f0f0f0',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        h6: {
            fontWeight: 600,
        },
        body1: {
            fontSize: '1rem',
        },
    },
});

const drawerWidth = 280;

function App() {
    const [chats, setChats] = useState([[]]);
    const [currentChatIndex, setCurrentChatIndex] = useState(0);
    const [drawerOpen, setDrawerOpen] = useState(true);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const sendMessage = async (message) => {
        if (message.trim() === '') return;

        const userMessage = { id: Date.now() + Math.random(), sender: 'user', text: message };
        setChats((prevChats) => {
            const newChats = [...prevChats];
            newChats[currentChatIndex] = [...newChats[currentChatIndex], userMessage];
            return newChats;
        });

        try {
            const response = await axios.post('http://localhost:5000/api/query', { question: message });
            const botMessage = {
                id: Date.now() + Math.random(),
                sender: 'bot',
                text: response.data.answer,
                chartData: response.data.chart_data || { labels: [], data: [] }
            };
            setChats((prevChats) => {
                const newChats = [...prevChats];
                newChats[currentChatIndex] = [...newChats[currentChatIndex], botMessage];
                return newChats;
            });
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const startNewChat = () => {
        setChats((prevChats) => [...prevChats, []]);
        setCurrentChatIndex(chats.length);
    };

    const getFirstUserMessages = (chats) => {
        return chats.map(chat => chat.find(message => message.sender === 'user'));
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box display="flex" flexDirection="column" minHeight="100vh" 
            // bgcolor="background.paper">
            bgcolor="#303030">
                <Header toggleDrawer={toggleDrawer} startNewChat={startNewChat} />
                <Box display="flex" flex={1} paddingTop="64px" >
                    <PreviousQuestionsDrawer
                        chats={chats}
                        firstUserMessages={getFirstUserMessages(chats)}
                        setCurrentChatIndex={setCurrentChatIndex}
                        drawerOpen={drawerOpen && !isMobile}
                    />
                    <Box
                        display="flex"
                        flexDirection="column"
                        flex={1}
                        style={{
                            transition: 'padding-left 0.3s',
                            paddingLeft: drawerOpen && !isMobile ? `${drawerWidth}px` : '0',
                        }}
                    >
                        <ChatWindow
                            messages={chats[currentChatIndex]}
                            sendMessage={sendMessage}
                            drawerOpen={drawerOpen && !isMobile}
                        />
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

function PreviousQuestionsDrawer({ firstUserMessages, setCurrentChatIndex, drawerOpen }) {
    return (
        <Paper
            elevation={3}
            style={{
                width: `${drawerWidth}px`,
                padding: '20px',
                display: drawerOpen ? 'block' : 'none',
                position: 'fixed',
                left: '0',
                top: '64px',
                bottom: '0',
                overflowY: 'auto',
                transition: 'width 0.3s, top 0.3s',
                // backgroundColor: theme.palette.secondary.main,
                backgroundColor: "#464646",
                color:"white"
            }}
        >
            <Typography variant="h6" style={{ marginBottom: '20px' }}>Previous Questions</Typography>
            <List>
                {firstUserMessages.map((message, index) => (
                    message ? (
                        <React.Fragment key={message.id}>
                            <ListItem button onClick={() => setCurrentChatIndex(index)}>
                                <ListItemText primary={`Chat ${index + 1}: ${message.text}`} />
                            </ListItem>
                            {index !== firstUserMessages.length - 1 && <Divider />}
                        </React.Fragment>
                    ) : null
                ))}
            </List>
        </Paper>
    );
}

function ChatWindow({ messages, sendMessage, drawerOpen }) {
    const [question, setQuestion] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (question.trim() === '') return;

        sendMessage(question);
        setQuestion('');
    };
    return (
        <Box overflowY="auto" flex={1} padding="20px" marginBottom={10} paddingLeft={30}>
            <Typography variant="h5" component="h3" paddingLeft={drawerOpen ? '210px' : '350px'} color="#898989">
            Welcome to the analytical chatbot!!
            </Typography>
            {messages.map((msg, index) => (
                <div key={index}>
                    <Message sender={msg.sender} text={msg.text} chartData={msg.chartData} />
                </div>
            ))}
            <div ref={messagesEndRef} />
            <Box
                display="flex"
                alignItems="center"
                padding="10px"
                marginLeft={20}
                marginRight={17}
                // paddingRight={drawerOpen ? '15' : '50'}
                // bgcolor="background.paper"
                bgcolor="rgba(0,0,0,0)"
                position="fixed"
                bottom="0"
                right="0"
                left={drawerOpen ? `${drawerWidth}px` : '0'}
                // boxShadow="0 -2px 5px rgba(0, 0, 0, 0.1)"
                style={{ transition: 'left 0.3s' }}
            >
                <TextField
                    id="user-input"
                    label="Type a message..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    fullWidth
                    size="small"
                    variant="outlined"
                    InputLabelProps={{
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            paddingTop:"10px"
                        },
                    }}
                    InputProps={{
                        style: {
                            borderRadius: '20px',
                            backgroundColor: '#464646',
                            padding: '10px',
                            color:"#fff"
                        },
                    }}
                    style={{ marginRight: '-73px', flex: 1, }}
                />
                <Button variant="contained" onClick={handleSubmit}><SendIcon fontSize='medium' sx={{ color: 'white' }}/></Button>
            </Box>
        </Box>
    );
}

export default App;
