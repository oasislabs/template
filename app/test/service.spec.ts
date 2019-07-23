const assert = require('assert');
const process = require('process');
const oasis = require('@oasislabs/client');
const config = require('../../config');

let bytecode = require('fs').readFileSync(config.WASM);

const chains = {
  local: {
    gateway: new oasis.gateways.Web3Gateway(
      config.WEB3_GATEWAY_URL,
      oasis.Wallet.fromMnemonic(config.MNEMONIC)
    ),
  },
  devnet: {
    gateway: new oasis.gateways.Gateway(
      config.DEVELOPER_GATEWAY_URL,
    ),
  }
};

if (process.env.CHAIN === undefined) {
  console.log("Please specify environment variable CHAIN={local, devnet}");
  process.exit();
}

let chain = chains[process.env.CHAIN];
if (chain === undefined) {
  console.log("The options for CHAIN are 'local' or 'devnet'");
  process.exit();
}

console.log(chain);

describe('MyService Test', () => {
  it('deploy a non-confidential service', async () => {
    // Deploy MyService
    service = await oasis.deploy({
      bytecode,
      arguments: [],
      header: { confidential: false },
      gateway: chain.gateway,
    });

    // Verify successful deployment
    assert.notEqual(service, null);

    // Disconnect from the gateway
    chain.gateway.disconnect();
  });

  // ...
  // Add more tests here!
  // ...
});
