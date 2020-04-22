import { Gateway } from 'oasis-std';

import { Greeter, Greeted } from '../service-clients/greeter';

async function main() {
    const gw: Gateway = new Gateway(
        'https://gateway.devnet.oasiscloud.io',
        'AAAAGYHZxhwjJXjnGEIiyDCyZJq+Prknbneb9gYe9teCKrGa',
    );

    const service = await Greeter.deploy(gw, {
        greeting: 'Hello,',
    });
    console.log(`Deployed Greeter at ${service.address.hex}`);

    const sub = await Greeted.subscribe(gw, null /* listen to any address */);

    console.log(`Greeter says: ${await service.greet('sample-app')}`);

    const event = await sub.first();
    console.log(`event: ${event.from.hex} greeted ${event.to}!`);
}

main().catch(console.error);
