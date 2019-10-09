const chalk = require('chalk');
const oasis = require('@oasislabs/client');

oasis.workspace.Quickstart.deploy({
  header: {confidential: false},
})
  .then(res => {
    let addrHex = Buffer.from(res._inner.address).toString('hex');
    console.log(`    ${chalk.green('Deployed')} Quickstart at 0x${addrHex}`);
  })
  .catch(err => {
    console.error(chalk.red('error'), err);
  })
  .finally(() => {
    oasis.disconnect();
  });
