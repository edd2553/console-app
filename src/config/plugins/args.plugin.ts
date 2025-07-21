import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const yarg = yargs(hideBin(process.argv))
  .option('b', {
    alias: 'base',
    type: 'number',
    description: 'Base number for calculations',
    demandOption: true,
  })
  .option('l', {
    alias: 'limit',
    type: 'number',
    description: 'Limit for the multiplication table',
    default: 10,
  })
  .option('s', {
    alias: 'show',
    type: 'boolean',
    description: 'Show the multiplication table in the console',
    default: false,
  })
  .option('n', {
    alias: 'name',
    type: 'string',
    description: 'Name of the output file',
  })
  .option('d', {
    alias: 'destination',
    type: 'string',
    description: 'Destination folder for the output file',
    default: 'outputs',
  })
  .check((argv, options) => {
    if (argv.b < 1) throw 'Base must be a positive number greater than 0';
    if (argv.l < 1) throw 'Limit must be a positive number greater than 0';
    return true;
  })
  .parseSync();
