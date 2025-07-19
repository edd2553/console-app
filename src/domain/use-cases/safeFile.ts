import { StorageRepository } from '../../interfaces/StorageRepository';

interface SaveFileUseCase {
  execute: (option: Options) => boolean;
}

interface Options {
  fileContent: string;
  destination?: string;
  fileName?: string;
}

export class SaveFile implements SaveFileUseCase {
  StorageRepository: StorageRepository;

  constructor(StorageRepository: StorageRepository) {
    /**
     * repository: StorageRepository
     */

    this.StorageRepository = StorageRepository;
  }

  createFolderIfNotExists(folderPath: string) {
    this.StorageRepository.mkdirSync(folderPath);
  }

  execute({
    fileContent,
    destination = 'outputs',
    fileName = 'table',
  }: Options): boolean {
    try {
      const folderPath = destination;

      this.createFolderIfNotExists(folderPath);
      this.StorageRepository.writeFileSync({
        path: `${folderPath}/${fileName}`,
        content: fileContent,
      });

      return true;
    } catch (error) {
      console.error('Error creating the file:', error);
      return false;
    }
  }
}
