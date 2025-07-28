export interface ExecuteProps {
  base: number;
  limit?: number;
}

export interface CreateTableUseCase {
  execute: (options: ExecuteProps) => string;
}

export class CreateTable implements CreateTableUseCase {
  constructor() /**
   * DI - Dependency injection
   */ {}

  execute({ base, limit = 10 }: ExecuteProps): string {
    let output = '';

    for (let i = 1; i <= limit; i++) {
      const result = base * i;
      output += `${base} x ${i} = ${result}`;

      if (i < limit) output += '\n';
    }

    return output;
  }
}
