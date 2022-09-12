const yargs = require('yargs');
const app = require("./app");

const dotenv = require("dotenv");

var fs = require('fs'),
    http = require('http'),
    https = require('https')


// var options = {
//     key: fs.readFileSync('./ssl-cert/pkey'),
//     cert: fs.readFileSync('./ssl-cert/cert'),
//     ca: fs.readFileSync('./ssl-cert/ca-bundle'),
// };

// Handle uncauht error
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandle uncauht!");
    process.exit(1)
})
// config 
dotenv.config({ path: '../config/config.env' });

// connecting database

const argv = yargs.argv
let server;

    server = app.listen(8443, () => {
        console.log(`Server is working on http://localhost:8443`)
    });

// else {
//     server = https.createServer(options, app).listen(process.env.PORT, function () {
//         console.log(`Server is working on http://localhost:${process.env.PORT}`);
//     });

// }



// unhandle promise rejection
process.on("unhandledRejection", err => {
    // console.log("Error", err)
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandle promise rejection!");

    server.close(() => {
        process.exit(1)
    })
});

