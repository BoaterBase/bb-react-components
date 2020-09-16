import getId from './getId';

test('getId', async () => {
  expect(getId('Some-Title-myid')).toBe('myid');
  expect(getId('myid')).toBe('myid');
  expect(() => {
    getId('');
  }).toThrow();
});
