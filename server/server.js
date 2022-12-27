const yargs = require('yargs');
// const next = require("next")
const dotenv = require("dotenv");
dotenv.config()
const port = process.env.PORT || '8443'
const dev = process.env.NODE_ENV || 'production'
// const server = next({ dev })
// const handle = server.getRequestHandler()
const shell = require('shelljs');

var fs = require('fs'),
  http = require('http'),
  https = require('https');
const { speciesTableTypes } = require('./config/common');
var dir = '../public/uploads';
// var options = {
//     key: fs.readFileSync('./ssl-cert/pkey'),
//     cert: fs.readFileSync('./ssl-cert/cert'),
//     ca: fs.readFileSync('./ssl-cert/ca-bundle'),
// };

// Handle uncauht error
const start = async () => {

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  for (let item of Object.keys(speciesTableTypes)) {
    let newDir = dir + `/${speciesTableTypes[item]}`
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(newDir, { recursive: true });
    }
  }
  let newDir = dir + `/additional`
  if (!fs.existsSync(newDir)) {
    fs.mkdirSync(newDir, { recursive: true });
  }

  //   server.prepare().then(() => {
  const app = require("./app");
  const argv = yargs.argv
  // let server;
  // else {
  //     server = https.createServer(options, app).listen(process.env.PORT, function () {
  //         console.log(`Server is working on http://localhost:${process.env.PORT}`);
  //     });

  // }
  // app.get("*", (req, res) => {
  //     return handle(req, res)
  // })
  app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
  });
  process.on("uncaughtException", (err) => {
    console.log(`Error: ${err}`);
    console.log("Shutting down the server due to unhandle uncauht!");
    process.exit(1)
  })

  // }).catch(err => {
  //     console.log(`Error: ${err}`);
  //     console.log("Shutting down the server due to unhandle promise rejection!");
  //     process.exit(1)

  // })
}

start()






