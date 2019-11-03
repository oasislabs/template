const chalk = require('chalk');
const oasis = require('@oasislabs/client');

oasis.workspace.Quickstart.deploy({
  header: {confidential: false},
})
  .then(res => {
    console.log(`    ${chalk.green('Deployed')} Quickstart at ${res.address.hex}`);
  })
  .catch(err => {
    console.error(chalk.red('error'), err);
  })
  .finally(() => {
    oasis.disconnect();
  });
