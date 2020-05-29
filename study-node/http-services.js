/**
 * http服务的事件
 */
// connection事件：在开始 HTTP 请求和响应前，客户端与服务器端需要建立底层的TCP连接，这个链接可能因为开启了keep-alive，可以多次请求响应之间使用，当连接建立的时候
// 服务器触发一次 connection 事件

// request事件：建立 TCP 链接后，http 模块叠层将在数据流中抽象出 HTTP 请求和 HTTP 响应，当请求数据发送到服务端。在解析出 HTTP 请求头后，触发该事件

// close事件：停止接受新的链接

// checkContinue事件：某些客户端发送较大数据的时候，不会将数据直接发送，而是先发送一个头部带 Expect：100-continue 的请求到服务器，服务器将触发 checkContinue 事件
// 如果没有为服务器监听这个事件，服务器将会自动响应客户端100 Continue 的状态码，表示接受数据上传，如果不接受数据较多时，响应客户端 400 Bad Request 拒绝客户端继续发送数据即可。
// 该事件不会触发 request 事件，他们直接互斥。当客户端收到100 Continue 后重新发起请求，才触发 request 事件

// connect事件：当客户端发起 CONNECT 请求时触发。

// upgrade事件：客户端要求升级连接的协议时，需要合服务端协商，客户端会在请求头中带上 Upgrade 字段，服务器端会在接收到这样的请求时触发事件。

// clientError事件：连接的客户端触发 error 时，这个额错误会传递到服务器端。此时触发