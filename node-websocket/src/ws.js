const { EventEmitter } = require('stream');
const http = require('http');

const crypto = require('crypto');
function hasKey(key) {
	const sha1 = crypto.createHash('sha1');
	sha1.update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11');
	return sha1.digest('base64');
}

// 这个也是固定的 用每个字节的mask key和数据的每一位做 按位异或
function handleMask(maskBytes, data) {
	const payload = Buffer.alloc(data.length);
	for (let i = 0; i < data.length; i++) {
		payload[i] = maskBytes[i % 4] ^ data[i];
	}
	return payload;
}

// 要构造协议的格式
function encodeMessage(opcode, payload) {
	// payload.length < 126
	let bufferData = Buffer.alloc(payload.length + 2 + 0);

	let byte1 = parseInt('10000000', 2) | opcode; // 设置 FIN 为 1
	let byte2 = payload.length;

	bufferData.writeUInt8(byte1, 0); // opcode
	bufferData.writeUInt8(byte2, 1); // payloadLength

	payload.copy(bufferData, 2); // payload的数据

	return bufferData;
}

// opCode对应不同的类型
const OPCODES = {
	CONTINUE: 0,
	TEXT: 1, // 文本
	BINARY: 2, // 二进制
	CLOSE: 8,
	PING: 9,
	PONG: 10,
};

class MyWebSocket extends EventEmitter {
	constructor(options) {
		super(options);
		const server = http.createServer();
		server.listen(options || 8080);
		server.on('upgrade', (req, socket) => {
			console.log(req.headers['sec-websocket-key']);
			this.socket = socket;
			socket.setKeepAlive(true);

			// 设置响应头
			const resHeaders = [
				'HTTP/1.1 101 Switching Protocols',
				'Upgrade: websocket',
				'Connection: Upgrade',
				'Sec-WebSocket-Accept: ' + hasKey(req.headers['sec-websocket-key']),
				'',
				'',
			].join('\r\n');
			socket.write(resHeaders);
			socket.on('data', (data) => {
				// 2. 处理数据 解析buffer按照协议规范
				console.log(data);
				this.handleData(data);
				// 3. 如何发送数据
			});
			socket.on('close', (error) => {
				this.emit('close');
			});
		});
	}
	handleData(bufferData) {
		const byte1 = bufferData.readUInt8(0);
		let opcode = byte1 & 0x0f;
		console.log(opcode, 'opcode');
		const byte2 = bufferData.readUInt8(1);
		const str2 = byte2.toString(2);
		const MASK = str2[0];
		let payloadLength = parseInt(str2.substring(1), 2);
		let curByteIndex = 2; // 当前处理的
		if (payloadLength === 126) {
			payloadLength = bufferData.readUInt16BE(2);
			curByteIndex += 2;
		} else if (payloadLength === 127) {
			payloadLength = bufferData.readUInt64BE(2);
			curByteIndex += 8;
		}
		let realData = null;
		// 根据我们的长度去截取
		if (MASK) {
			// 16 + 16 = 32 = 4 * 8
			const maskKey = bufferData.slice(curByteIndex, curByteIndex + 4);
			curByteIndex += 4;
			const payloadData = bufferData.slice(
				curByteIndex,
				curByteIndex + payloadLength
			);
			realData = handleMask(maskKey, payloadData);
		} else {
			// payload的数据
			realData = bufferData.slice(curByteIndex, curByteIndex + payloadLength);
		}
		this.handleRealData(opcode, realData);
	}
	handleRealData(opcode, realDataBuffer) {
		switch (opcode) {
			// 不同的类型对应不同的处理方式
			case OPCODES.TEXT:
				this.emit('data', realDataBuffer.toString('utf8'));
				break;
			case OPCODES.BINARY:
				this.emit('data', realDataBuffer);
				break;
			default:
				this.emit('close');
				break;
		}
	}
	send(data) {
		let opcode; // 类型
		let buffer;
		if (Buffer.isBuffer(data)) {
			opcode = OPCODES.BINARY;
			buffer = data;
		} else if (typeof data === 'string') {
			opcode = OPCODES.TEXT;
			buffer = Buffer.from(data, 'utf8');
		} else {
			console.error('暂不支持发送的数据类型');
		}
		this.doSend(opcode, buffer);
	}
	doSend(opcode, buffer) {
		this.socket.write(encodeMessage(opcode, buffer));
	}
}

module.exports = MyWebSocket;
