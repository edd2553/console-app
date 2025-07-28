async function runCommand(args: string[]) {
  process.argv = [...process.argv, ...args];

  const { yarg } = await import('./args.plugin');

  return yarg;
}

describe('Tests on args.plugin.ts', () => {
  const originalArgv = process.argv;

  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  test('Should return default values', async () => {
    const argv = await runCommand(['-b', '5']);

    expect(argv).toEqual(
      expect.objectContaining({ b: 5, l: 10, s: false, d: 'outputs' })
    );
  });

  test('Should return configuration with custom values', async () => {
    const argv = await runCommand([
      '-b',
      '3',
      '-l',
      '15',
      '-s',
      '-n',
      'dummy-file-name.txt',
      '-d',
      'my-folder',
    ]);

    expect(argv).toEqual(
      expect.objectContaining({
        b: 3,
        l: 15,
        s: true,
        n: 'dummy-file-name.txt',
        d: 'my-folder',
      })
    );
  });
});
