import getListing from './getListing';

test('getListing', async () => {
  const listing = getListing('g5nm2l6X');

  expect(listing).toBeDefined();
});
