import 'cross-fetch/polyfill';

// Import packaged source from dist
import * as boaterbase from '../dist';

//** Test that the module build worked ok */
test('moduleTest', async () => {
  expect(boaterbase).toBeDefined();
});
