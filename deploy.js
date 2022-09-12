const shell = require('shelljs');


const deploy = async () => {
    let res = await shell.exec('next build');
    if (res.code !== 0) {
      shell.echo('Error: next build failed');
      shell.exit(1);
    }
    let res2 = await shell.exec('next export');
    if (res2.code !== 0) {
      shell.echo('Error: next build failed');
      shell.exit(1);
    }
    let res3 = await shell.exec('gh-pages -d out');
    if (res3.code !== 0) {
      shell.echo('Error: deploy build failed');
      shell.exit(1);
    }
  }

deploy()