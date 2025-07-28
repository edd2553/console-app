import fs from 'node:fs';
import { fileSystemRepo } from '../../../architecture/fileSystem';
import {
  SafeFileOptions,
  StorageRepository,
} from '../../../interfaces/StorageRepository';
import { SaveFile } from './saveFile';

describe('Tests on saveFileUseCase', () => {
  let saveFileInstance: SaveFile;
  const customOptions: Required<SafeFileOptions> = {
    fileContent: 'This is the multiplication table of 5',
    fileName: 'multiplication-table-of-5.txt',
    folderPath: 'testFolder',
  };
  const filePath = `${customOptions.folderPath}/${customOptions.fileName}`;

  beforeEach(() => {
    saveFileInstance = new SaveFile(fileSystemRepo);
  });

  afterEach(() => {
    const existsFolderOutputs = fs.existsSync('outputs');
    if (existsFolderOutputs) fs.rmSync('outputs', { recursive: true });

    const existsCustomFolder = fs.existsSync(customOptions.folderPath);
    if (existsCustomFolder)
      fs.rmSync(customOptions.folderPath, { recursive: true });
  });

  test('Should have execute method and the storage repository', () => {
    expect(saveFileInstance.execute).toBeDefined();
    expect(saveFileInstance.StorageRepository).toBeDefined();
  });

  test('Should save a file with default parameters', () => {
    const filePath = 'outputs/table.txt';
    const options: SafeFileOptions = {
      fileContent: 'Test content',
    };

    const result = saveFileInstance.execute(options);

    const existsFile = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

    expect(result).toBeTruthy();
    expect(existsFile).toBeTruthy();
    expect(fileContent).toBe(options.fileContent);
  });

  test('Should save file with custom values', () => {
    const result = saveFileInstance.execute(customOptions);
    const existsFile = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

    expect(result).toBeTruthy();
    expect(existsFile).toBeTruthy();
    expect(fileContent).toBe(customOptions.fileContent);
  });

  test('Should return false if directory could no be created', () => {
    const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
      throw new Error('This is a custom error from testing').message;
    })
    const result = saveFileInstance.execute({ fileContent: 'Buenas tardes' });

    expect(result).toBeFalsy();
    mkdirSpy.mockRestore();
  });

  test('Should return false if file could not be created', () => {

    const mkdirSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => { throw new Error('This is a writing error').message })
    const result = saveFileInstance.execute({ fileContent: 'Buenas tardes' });

    expect(result).toBe(false);
    mkdirSpy.mockRestore();

  });
});
