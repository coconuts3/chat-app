const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));  // クライアントサイドの静的ファイルを提供

// WebSocketの接続イベント
io.on('connection', (socket) => {
  console.log('a user connected');
  
  // メッセージ受信
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);  // すべてのクライアントにメッセージを送信
  });
  
  // 切断イベント
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// サーバーを3000ポートで起動
server.listen(3000, () => {
  console.log('listening on *:3000');
});
