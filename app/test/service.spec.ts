import oasis from '@oasislabs/client';

jest.setTimeout(20000);

describe('Quickstart Test', () => {
  it('should deploy non-confidentially', async () => {
    const service = await oasis.workspace.Quickstart.deploy({
      header: {confidential: false},
    });

    expect(service).toBeTruthy();
  });

  afterAll(() => {
    oasis.disconnect();
  });
});
