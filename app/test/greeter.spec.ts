import { Gateway } from 'oasis-std';

import { Greeter, Greeted } from '../service-clients/greeter';

jest.setTimeout(5000);

describe('Greeter Test', () => {
    let service: Greeter;

    // create a gateway to the oasis node
    let gw: Gateway = new Gateway(
        'http://localhost:1234',
        'AAAAGYHZxhwjJXjnGEIiyDCyZJq+Prknbneb9gYe9teCKrGa',
    );

    beforeAll(async () => {
        // deploy the Greeter service
        service = await Greeter.deploy(gw, {
            greeting: 'Hello,',
        });
    });

    it('deployed', async () => {
        expect(service).toBeTruthy();
    });

    it('known greeting', async () => {
        let sub = await Greeted.subscribe(gw, service.address);
        let greeting = await service.greet('friend');
        expect(greeting).toBe('Hello, friend');
        for await (const event of sub) {
            expect(event.to).toBe('friend');
            break;
        }
    });

    afterAll(async () => {
        await gw.disconnect();
    });
});
