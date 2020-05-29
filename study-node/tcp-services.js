var net = require("net");
var server = net.createServer(function(socket) {
  // 新的链接
  socket.on("data", function(data) {
    socket.write('你好')
  });

  socket.on('end', function(){
      console.log('链接断开');
  })
  socket.write('欢迎');
});

server.listen(8124, function(){
    console.log('server bound');
})

/***
 * 服务创建方式
 */
// 这里通过 net.createServer(listenr) 创建 TCP 服务器，listener 是连接事件 connection 的侦听器，也可以使用下面方式创建
// var server = net.createServer();
// server.on('connection', function(socket){
//     // 新的链接
// })
// server.listen(8124);

/**
 * TCP 服务的事件
 */

// 1.服务器事件
// listening：在调用 server.listen() 绑定端口后触发
// connection：每个客户端套接字链接到服务端时触发
// close：当服务器关闭时触发，调用它之后，服务器停止接受新的套接字链接
// error：服务器发生异常时，触发该事件

// 2.连接事件
// data：当一端调用 write() 发送数据时，另一端会触发 data 事件，事件传递的数据就是 write() 发送的数据
// end：当连接的任意一端发送 FIN 数据时，触发该事件
// connect：该事件用于客户端，当套接字与服务端连接成功时会被触发
// drain：当任意一端调用 write() 发送数据时候触发
// error：发生异常触发
// close：当套接字完全关闭触发
// timeout：当一定时间后连接不再活跃，该事件触发

