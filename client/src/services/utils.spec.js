import Utils from '@/services/utils';
jest.useFakeTimers();

test('Builds tree array', () => {
  const linearArray = [
    { name: 'A', parentId: '' },
    { name: 'D', parentId: '' },
    { name: 'B', parentId: 'A' },
    { name: 'C', parentId: 'B' },
  ];

  const treeArray = Utils.buildTreeData(linearArray, 'parentId');

  expect(treeArray[0].children[0].name).toBe('B');
  expect(treeArray[0].children[0].children[0].name).toBe('C');
  expect(treeArray[1].name).toBe('D');
});

test('Debounces function', async () => {
  const testFunction = jest.fn();

  const debouncedFunction = Utils.debounce(testFunction, 0);

  for (let i = 0; i < 5; i++) {
    debouncedFunction();
  }

  jest.runAllTimers();

  expect(testFunction).toHaveBeenCalledTimes(1);
});
