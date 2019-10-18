import oasis from '@oasislabs/client';

jest.setTimeout(20000);

describe('Quickstart', () => {
  let service;

  beforeAll(async () => {
    service = await oasis.workspace.Quickstart.deploy({
      header: {confidential: false},
    });
  });

  it('says hello', async () => {
    expect(await service.sayHello()).toMatch(/^Hello/);
  });

  afterAll(() => {
    oasis.disconnect();
  });
});
