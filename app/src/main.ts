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

    const sub = await Greeted.subscribe(gw, service.address);

    const greeting = await service.greet({ name: 'sample-app' }); // emits a `Greeted` event
    console.log(`Greeter says: ${greeting}`);

    const event = await sub.first();
    console.log(`event: ${event.from.hex} greeted ${event.to}!`);
}

main().catch(console.error);
