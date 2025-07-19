export interface StorageRepository {
  mkdirSync: (folderPath: string) => boolean;
  writeFileSync: ({ path, content }: WriteFileOptions) => boolean;
}

export interface WriteFileOptions {
  path: string;
  content: string;
}
