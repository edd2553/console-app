import { CreateHeader } from '../domain/use-cases/createHeader';
import { CreateTable } from '../domain/use-cases/createTable/createTable';
import { SaveFile } from '../domain/use-cases/saveFile/saveFile';
import { fileSystemRepo } from '../architecture/fileSystem';

export interface RunOptions {
  base: number;
  limit: number;
  showTable: boolean;
  fileName?: string;
  destination?: string;
}

export class ServerApp {
  static async run({
    base,
    limit,
    showTable,
    destination: folderPath,
    fileName = `multiplication-table-${base}.txt`,
  }: RunOptions) {

    console.log('Server running...')

    const headers = new CreateHeader().execute({ base });
    const table = new CreateTable().execute({ base, limit });
    const fileManager = new SaveFile(fileSystemRepo);

    const fileContent = `${headers}  \n${table}`;

    const isFileCreated = fileManager.execute({
      fileContent,
      folderPath,
      fileName,
    });

    if (showTable) console.log(fileContent);

    if (isFileCreated) {
      console.log(`File created: ${folderPath}/${fileName}`);
    } else {
      console.error('Error creating the file.');
    }
  }
}
