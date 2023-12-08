const MyWebSocket = require('./ws');

const ws = new MyWebSocket({ port: 8080 });

ws.on('data', (data) => {
	console.log('receive data:' + data);
	// 发送数据
	setTimeout(() => {
		ws.send(`i send ${data}`);
	}, 2000);
});

ws.on('close', (code, reason) => {
	console.log('close', code, reason);
});
