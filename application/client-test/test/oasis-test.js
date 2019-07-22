const process = require('process');
const oasis = require('@oasislabs/client');
const config = require('../config');
const assert = require('assert');

let bytecode = require('fs').readFileSync(config.WASM);
console.log(config);

const chains = {
  local: {
    gateway: new oasis.gateways.Web3Gateway(
      config.WEB3_GATEWAY_URL,
      oasis.Wallet.fromMnemonic(config.MNEMONIC)
    ),
    completion: chain => chain.gateway.disconnect(),
  },
  devnet: {
    gateway: new oasis.gateways.Gateway(
      config.DEVELOPER_GATEWAY_URL,
    ),
    completion: chain => {},
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

describe('MyService Test', function () {
  it('deploy a non-confidential service', async () => {
    service = await oasis.deploy({
      bytecode,
      arguments: [],
      header: { confidential: false },
      gateway: chain.gateway,
    });

    assert.notEqual(service, null);
  });

  // ...
  // Add more tests here!
  // ...
});