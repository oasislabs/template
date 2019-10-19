const chalk = require('chalk');
const oasis = require('@oasislabs/client');

oasis.workspace.Quickstart.deploy({
  header: {confidential: false},
})
  .then(res => {
    let addrHex = oasis.utils.bytes.toHex(res.address);
    console.log(`    ${chalk.green('Deployed')} Quickstart at 0x${addrHex}`);
  })
  .catch(err => {
    console.error(chalk.red('error'), err);
  })
  .finally(() => {
    oasis.disconnect();
  });
