const SerialPort = require('serialport')
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io");
const io = new Server(server);
const port = new SerialPort("COM3", {
  baudRate: 9600,
})
const parsers = SerialPort.parsers
const parser = new parsers.Readline({
  delimiter: '\r\n',
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


port.pipe(parser)
parser.on('data', function(data){
  io.emit('data', data)
})

server.listen(3000, function(){
  console.log('port 3000 listening on port');
})

