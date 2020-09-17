import getListing from './getListing';

test('getListing', async () => {
  const id = 'g5nm2l6X';

  // Start the resource
  const listingResource = getListing(id);
  expect(listingResource).toBeDefined();

  // Should not be ready to read yet
  expect(() => {
    listingResource.read();
  }).toThrow();

  // Standard await for promise
  const listingGet = await listingResource.get();
  expect(listingGet).toBeDefined();

  // After await this should be ready to read
  const listingRead = listingResource.read();
  expect(listingRead).toBeDefined();
  expect(listingRead.id).toBe(id);
});
