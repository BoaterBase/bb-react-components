import getListings from './getListings';

test('getListings', async () => {
  const listingsResource = getListings(3);
  expect(listingsResource).toBeDefined();
  const listings = await listingsResource.get();
  expect(listings.length).toBe(3);
});
