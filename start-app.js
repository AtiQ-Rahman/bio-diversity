const shell = require('shelljs');

var fs = require('fs');
var dir = './uploads';

const start = async () => {

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  let res = await shell.exec('node server/server.js');

}

start()