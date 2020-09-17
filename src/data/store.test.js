import { load, dump, stringify, parse, clean } from './store';

test('store', async () => {
  load(Object.entries({ a: 'A', b: 'B' }));
  expect(dump().get('a')).toBe('A');
  const data = stringify();
  clean();
  expect(dump().size).toBe(0);
  parse(data);
  expect(dump().get('b')).toBe('B');
});
