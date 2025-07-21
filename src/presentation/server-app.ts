import { CreateHeader } from '../domain/use-cases/createHeader';
import { CreateTable } from '../domain/use-cases/createTable';
import { SaveFile } from '../domain/use-cases/safeFile';
import { fileSystemRepo } from '../repository/fileSystem';

interface RunOptions {
  base: number;
  limit: number;
  showTable: boolean;
  fileName?: string;
  destination?: string;
}

export class ServerApp {
  static async run(options: RunOptions) {
    const { base, limit, showTable, destination, fileName } = options;
    const headers = new CreateHeader().execute({ base });
    const table = new CreateTable().execute({ base, limit });

    const content = `${headers}  \n${table}`;

    const fileManager = new SaveFile(fileSystemRepo);
    const isFileCreated = fileManager.execute({
      fileContent: content,
      destination,
      fileName: fileName || `multiplication-table-${base}.txt`,
    });

    if (showTable)
      console.log(`${headers}  \n${table}
      `);

    if (isFileCreated) {
      console.log(`File created: ${destination}/${fileName}`);
    } else {
      console.error('Error creating the file.');
    }
  }
}
