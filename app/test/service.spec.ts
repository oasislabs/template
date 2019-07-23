const oasis = require('@oasislabs/client');

describe('Quickstart Test', () => {
  it('should deploy non-confidentially', async () => {
    const service = await oasis.project.QuickstartClient.deploy({
      confidential: false,
    });

    expect(service).toBeTruthy();
  });

  afterAll(() => {
    oasis.disconnect();
  });
});
