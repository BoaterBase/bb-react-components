// Import packaged source from dist
import * as cjs from './dist/index';

//** Test that the module build worked ok */
test('moduleTest', async () => {
  expect(cjs).toBeDefined();
});
