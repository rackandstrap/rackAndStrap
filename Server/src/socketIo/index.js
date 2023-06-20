const socketIO = require('socket.io')

const createWebSocket = (httpServer) => {
    io = socketIO(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
        }
    })

    const users = {}; // Object to store user-to-socketID mapping

    io.on('connection', (socket) => {
        console.log(`Connection established - Id: ${socket.id}`)

        socket.on('userConnected', (userName) => {
            users[userName] = socket.id;
        });
        
        // Handle private messages
        socket.on('privateMessage', ({ senderName, recipientName, message }) => {
            const recipientSocketId = users[recipientName];
            if (recipientSocketId) {
                // Send the private message to the recipient socket
                io.to(recipientSocketId).emit('privateMessage', { sender: senderName, content: message });
            }
        });

        socket.on('message', (message) => {
            console.log('Received message:', message);
            socket.broadcast.emit('message', `message: ${message} - Id: ${socket.id}`);
        });
        
        socket.on('disconnect', () => {
            console.log(`Connection closed - Id: ${socket.id}`)
        })
    })
}


module.exports = createWebSocket