import fs from 'node:fs';
import {
  StorageRepository,
  WriteFileOptions,
} from '../interfaces/StorageRepository';

export const fileSystemRepo: StorageRepository = {
  mkdirSync: (folderPath: string) => {
    fs.mkdirSync(folderPath, { recursive: true });
    return true;
  },
  writeFileSync: ({ path, content }: WriteFileOptions) => {
    fs.writeFileSync(path, content);
    return true;
  },
};
