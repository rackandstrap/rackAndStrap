const socketIO = require('socket.io')

const createWebSocket = (httpServer) => {
    io = socketIO(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
        }
    })

    io.on('connection', (socket) => {
        console.log(`Connection established - Id: ${socket.id}`)

        socket.on('message', (message) => {
            console.log('Received message:', message);
            socket.emit('message', `Server received: ${message}`);
        });
        
        socket.on('disconnect', () => {
            console.log(`Connection closed - Id: ${socket.id}`)
        })
    })
}


module.exports = createWebSocket