import fs from 'node:fs';
import {
  SafeFileOptions,
  StorageRepository,
} from '../interfaces/StorageRepository';
import { DEFAULT_FOLDER_PATH } from '../constants';

export const fileSystemRepo: StorageRepository = {
  saveFileSync: ({ fileContent, fileName, folderPath }: SafeFileOptions) => {
    fs.mkdirSync(folderPath || DEFAULT_FOLDER_PATH, { recursive: true });
    fs.writeFileSync(`${folderPath}/${fileName}`, fileContent);
    return true;
  },
};
