const shell = require('shelljs');


const nextBuild = () => {
    let res = shell.exec('next build');
    if (res.code !== 0) {
      shell.echo('Error: next build failed');
      shell.exit(1);
    }
    let res2 = shell.exec('next export');
    if (res2.code !== 0) {
      shell.echo('Error: next build failed');
      shell.exit(1);
    }
  }
  const deploy = () => {
    let res = shell.exec('gh-pages -d out');
    if (res.code !== 0) {
      shell.echo('Error: deploy build failed');
      shell.exit(1);
    }
  }

nextBuild()
deploy()