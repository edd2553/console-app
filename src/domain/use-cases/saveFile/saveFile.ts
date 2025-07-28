import { SafeFileOptions, StorageRepository } from '../../../interfaces/StorageRepository';

interface SaveFileUseCase {
  execute: (option: SafeFileOptions) => boolean;
}

export class SaveFile implements SaveFileUseCase {
  StorageRepository: StorageRepository;

  constructor(StorageRepository: StorageRepository) {
    /**
     * repository: StorageRepository
     */

    this.StorageRepository = StorageRepository;
  }

  execute({
    fileContent,
    folderPath = 'outputs',
    fileName = 'table.txt',
  }: SafeFileOptions): boolean {
    try {
      this.StorageRepository.saveFileSync({
        fileContent,
        fileName,
        folderPath
      });

      return true;
    } catch (error) {
      console.error('Error creating the file:', error);
      return false;
    }
  }
}
