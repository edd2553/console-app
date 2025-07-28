import { CreateTable } from '../domain/use-cases/createTable/createTable';
import { SaveFile } from '../domain/use-cases/saveFile/saveFile';
import { RunOptions, ServerApp } from './server-app';
describe('server-app tests', () => {
  test('Should create ServerApp instance', () => {
    const serverApp = new ServerApp();
    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe('function');
  });

  test('Should run ServerApp with options', () => {
    const logSpy = jest.spyOn(console, 'log');
    const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
    const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

    const options: RunOptions = {
      base: 2,
      limit: 10,
      showTable: false,
      fileName: 'dummy-file.txt',
      destination: 'dummy-folder',
    };

    ServerApp.run(options);

    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith('Server running...');
    expect(logSpy).toHaveBeenCalledWith(
      `File created: ${options.destination}/${options.fileName}`
    );

    expect(createTableSpy).toHaveBeenCalledTimes(1);
    expect(createTableSpy).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });

    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      folderPath: options.destination,
      fileName: options.fileName,
    });
  });
});
