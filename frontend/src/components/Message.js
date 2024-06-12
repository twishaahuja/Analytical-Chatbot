// import React from 'react';
// import './Message.css';

// const Message = ({ sender, text }) => {
//     return (
//         <div className={`message ${sender}`}>
//             {text}
//         </div>
//     );
// };

// export default Message;
// Message.js
import React from 'react';
import './Message.css';

const Message = ({ sender, text }) => {
    return (
        <div className={`message ${sender === 'bot' ? 'bot-message' : 'bbb'}`}>
            {text}
        </div>
    );
};

export default Message;
