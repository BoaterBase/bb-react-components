import { BoaterBase, useBoaterBase, ListingBlock } from '../src';

test('imports', async () => {
  expect(BoaterBase).toBeDefined();
  expect(useBoaterBase).toBeDefined();
  expect(ListingBlock).toBeDefined();
  expect(ListingBlock.getListing).toBeDefined();
});
