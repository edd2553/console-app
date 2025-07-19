"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const MULTIPLICATION_TABLE_BASE = 9;
const createFolderIfNotExists = (folderPath) => {
    node_fs_1.default.mkdirSync(folderPath, { recursive: true });
};
function writeInFile(content = '') {
    const folderPath = `outputs`;
    createFolderIfNotExists(folderPath);
    node_fs_1.default.writeFileSync(`${folderPath}/tabla-${MULTIPLICATION_TABLE_BASE}.txt`, content);
}
function printEquals() {
    const NUMBER_OF_EQUALS = 33;
    const numberOfEquals = `${Array.from({ length: NUMBER_OF_EQUALS })
        .map((test) => '=')
        .join('')}`;
    return `${numberOfEquals}`;
}
function handleMultiplications() {
    const numberOfMultiplications = 10;
    let multiplicationLine = '';
    for (let i = 1; i < numberOfMultiplications; i++) {
        const result = MULTIPLICATION_TABLE_BASE * i;
        multiplicationLine += `${MULTIPLICATION_TABLE_BASE} x ${i} = ${result} \n`;
    }
    return multiplicationLine;
}
const equals = printEquals();
const multiplications = handleMultiplications();
const wholeString = `${equals}
           Tabla del ${MULTIPLICATION_TABLE_BASE}
${equals}
${multiplications}`;
console.log(wholeString);
writeInFile(wholeString);
