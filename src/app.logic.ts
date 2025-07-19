import fs from 'node:fs';
import { yarg } from './config/plugins/args.plugin';

// file
const createFolderIfNotExists = (folderPath: string) => {
  fs.mkdirSync(folderPath, { recursive: true });
};

function writeInFile(content: string = '', base: number = 10) {
  const folderPath = `outputs`;

  createFolderIfNotExists(folderPath);
  fs.writeFileSync(`${folderPath}/tabla-${base}.txt`, content);
}


// core logic
function buildEquals() {
  const NUMBER_OF_EQUALS = 33;

  const numberOfEquals = `${Array.from({ length: NUMBER_OF_EQUALS })
    .map((test) => '=')
    .join('')}`;

  return `${numberOfEquals}`;
}

export function buildMultiplications(base: number = 10, limit: number = 10) {
  let multiplicationLine = '';

  for (let i = 1; i <= limit; i++) {
    const result = base * i;
    multiplicationLine += `${base} x ${i} = ${result} \n`;
  }

  return multiplicationLine;
}

// Display
function buildHeader(base: number = 10) {
  const equals = buildEquals();
  const multiplicationHeader = `${equals}
             Tabla del ${base}
  ${equals} \n`;

  return multiplicationHeader;
}

async function runMultiplications() {
  const { b: base, l: limit, s: showTable } = yarg;

  let wholeString = '';
  wholeString += buildHeader(base);
  wholeString += buildMultiplications(base, limit);

  if (showTable) {
    console.log(wholeString);
  }

  writeInFile(wholeString, base);
  console.log(`File created: outputs/tabla-${base}.txt`);
}

runMultiplications();
