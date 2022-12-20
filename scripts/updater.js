
const PORT = 8080;
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
const shell = require('shelljs');



app.post('/update-LEQpNz2GB6PRh5uM', async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write("Started Upload Process\n");
  let results;

  results = shell.exec('git pull');
  res.write(String(results.code));
  res.write(String(results.stdout));
  res.write(String(results.stderr));
  res.write('\n\n');

  results = shell.exec('pm2 restart bio_server');
  res.write(String(results.code));
  res.write(String(results.stdout));
  res.write(String(results.stderr));
  res.write('\n\n');

  results = shell.exec('pm2 restart bio_client');
  res.write(String(results.code));
  res.write(String(results.stdout));
  res.write(String(results.stderr));
  
  res.write('\n\n');
  results = shell.exec('pm2 show bio_server');
  res.write(String(results.code));
  res.write(String(results.stdout));
  res.write(String(results.stderr));
  res.write('\n\n');

  res.end('Finished');
});


app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});