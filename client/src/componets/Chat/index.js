// import React, {useState, useEffect} from 'react';
// import {io} from 'socket.io-client';
// import './index.css';
// import message from './Message';

// const Chat = () => {
//     const [messages, setMessages] = useState([])

//     let socket;
  
// useEffect(() => {
//     var socket = io('http://localhost:3001');

//     socket.on('message', (message) => setMessages((prevMessages) => [...prevMessages, message]));

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const handleSubmit = (e) => {
//     socket.emit('message', e.target.elements.message.value);
//     console.log(e.target.elements.message.value);
//   };

//     return ( 
//         <div id="chatBox">
//                 <div id="output">
//                     {messages.map( (message) => {
//                         return (
//                             <p>{message} </p>
//                         )
//                     })}
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                     <input type='text' id="message"></input>
//                     <button>send</button>
//                 </form>
            
//         </div>
//      );
// }
 
// export default Chat;

import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import './index.css';
import message from './Message';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null); // Define the socket reference using useRef

  useEffect(() => {
    socketRef.current = io('http://localhost:3001'); // Assign the socket instance to the current property

    let names = ['sam', 'bob', 'fred', 'maria', 'sataporn', 'jon']
    const index =  Math.floor(Math.random() * names.length);
    console.log(names[index])

    socketRef.current.on('connect', () => {
      socketRef.current.emit('userConnected', names[index])
      console.log(`Connected`)
    })

    socketRef.current.on('privateMessage', (message) => setMessages((prevMessages) => [...prevMessages, message.content]));

    // Clean up the socket connection when the component unmounts
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socketRef.current.emit('privateMessage', {recipientName: e.target.elements.recipient.value, message: e.target.elements.message.value});
  };

  return (
    <div id="chatBox">
      <div id="output">
        {messages.map((message) => {
          return <p key={message}>{message}</p>;
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" id="message" />
        <input type="text" id="recipient" />
        <button>send</button>
      </form>
    </div>
  );
};

export default Chat;

