export interface SafeFileOptions {
  fileContent: string;
  folderPath?: string;
  fileName?: string;
}

export interface StorageRepository {
  saveFileSync: ({
    fileContent,
    fileName,
    folderPath
  }: SafeFileOptions) => boolean;
}
