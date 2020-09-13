import 'cross-fetch/polyfill';
import { allListings } from '../src/api/listings';
import { listingUpdates, allUpdates } from '../src/api/updates';

test('allListings', async () => {
  const listings = await allListings().limit(3).get({ options: 'options' });
  expect(listings.size).toBe(3);
  expect(listings.docs[0].id).toBeDefined();
});

test('getListing', async () => {
  const id = 'g5nm2l6X';
  const listing = await allListings().doc(id).get({ options: 'options' });
  expect(listing.id).toBe(id);
  expect(listing.profile.id).toBeDefined();
});

test('listingUpdates', async () => {
  const id = 'g5nm2l6X';
  const updates = await listingUpdates(id).get();
  expect(updates.docs[0].id).toBeDefined();
});

test('getListingUpdate', async () => {
  const id = 'g5nm2l6X';
  const updateId = '5mQ1CmK7';
  const update = await listingUpdates(id).doc(updateId).get();
  expect(update.id).toBe(updateId);
  expect(update.slug).toMatch(new RegExp(updateId));
});
