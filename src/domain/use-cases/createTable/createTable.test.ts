import { CreateTable } from './createTable';

describe('CreateTable use case', () => {
  let createTableInstance: CreateTable;

  beforeEach(() => {
    createTableInstance = new CreateTable();
  });

  test('should create table with default values', () => {
    const table = createTableInstance.execute({ base: 2 });
    const rows = table.split('\n').length;

    expect(createTableInstance).toBeInstanceOf(CreateTable);
    expect(typeof CreateTable.prototype.execute).toBe('function');
    expect(table).toContain('2 x 5 = 10');
    expect(table).toContain('2 x 10 = 20');
    expect(rows).toBe(10);
  });

  test('CreateTable should have a execute method', () => {
    expect(typeof CreateTable.prototype.execute).toBe('function');
  });

  test('Should create table with custom values', () => {
    const base = 3;
    const limit = 20;

    const multiplyNumber1 = 5;
    const multiplyNumber2 = 1;
    const result1 = base * multiplyNumber1;
    const result2 = base * multiplyNumber2;

    const options = {
      base,
      limit,
    };

    const table = createTableInstance.execute(options);
    const rows = table.split('\n').length;

    expect(table).toContain(`${base} x ${multiplyNumber1} = ${result1}`);
    expect(table).toContain(`${base} x ${multiplyNumber2} = ${result2}`);
    expect(rows).toBe(limit);
  });

  test('should return empty string for limit = 0', () => {
    const instance = new CreateTable();
    const output = instance.execute({ base: 3, limit: 0 });
    expect(output).toBe('');
  });
});
