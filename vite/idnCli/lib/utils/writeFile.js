const fs = require('fs')

function writeFile(path, content) {
	fs.promises.writeFile(path, content)
}

module.exports = writeFile
