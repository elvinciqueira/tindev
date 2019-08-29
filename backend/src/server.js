const express = require('express');
const moongose = require('mongoose');

const routes = require('./routes');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', socket => {
    const { user } = socket.handshake.query

   connectedUsers [user] = socket.id;
});

moongose.connect('mongodb+srv://elvin:elvin@cluster0-o4tds.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser:true
})

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);


server.listen(3333);