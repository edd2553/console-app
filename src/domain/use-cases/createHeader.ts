interface ExecuteProps {
  base: number;
}

export class CreateHeader {
  constructor() {}

  execute({ base }: ExecuteProps) {
    const multiplicationHeader = `${'='.repeat(20)} \n     Tabla del ${base}      \n${'='.repeat(20)} \n`;

    return multiplicationHeader;
  }
}
