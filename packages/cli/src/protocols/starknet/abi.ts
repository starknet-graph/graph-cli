import path from 'path';
import fs from 'fs-extra';
import immutable from 'immutable';
import AbiCodeGenerator from './codegen/abi';

export default class ABI {
  constructor(
    public name: string,
    public file: string | undefined,
    public data: immutable.Collection<any, any>,
  ) {
    this.name = name;
    this.file = file;
    this.data = data;
  }

  codeGenerator() {
    return new AbiCodeGenerator(this);
  }

  static eventSignature(event: immutable.Map<any, any>) {
    return `${event.get('name')}(${event
      .get('data', [])
      .map((property: any) => property.get('type'))
      .join(',')})`;
  }

  static normalized(json: any) {
    if (Array.isArray(json)) {
      return json;
    }
    if (json.abi !== undefined) {
      return json.abi;
    }
    if (json.compilerOutput?.abi !== undefined) {
      return json.compilerOutput.abi;
    }
    return undefined;
  }

  static load(name: string, file: string) {
    const data = JSON.parse(fs.readFileSync(file).toString());
    const abi = ABI.normalized(data);

    if (abi === null || abi === undefined) {
      throw Error(`No valid ABI in file: ${path.relative(process.cwd(), file)}`);
    }

    return new ABI(name, file, immutable.fromJS(abi));
  }
}
