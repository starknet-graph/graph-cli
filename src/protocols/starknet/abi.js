const fs = require('fs-extra')
const immutable = require('immutable')
const path = require('path')

const AbiCodeGenerator = require('./codegen/abi')

module.exports = class ABI {
  constructor(name, file, data) {
    this.name = name
    this.file = file
    this.data = data
  }

  codeGenerator() {
    return new AbiCodeGenerator(this)
  }

  static eventSignature(event) {
    return `${event.get('name')}(${event
      .get('data', [])
      .map(property => property.get('type'))
      .join(',')})`
  }

  static normalized(json) {
    if (Array.isArray(json)) {
      return json
    } else if (json.abi !== undefined) {
      return json.abi
    } else if (
      json.compilerOutput !== undefined &&
      json.compilerOutput.abi !== undefined
    ) {
      return json.compilerOutput.abi
    } else {
      return undefined
    }
  }

  static load(name, file) {
    let data = JSON.parse(fs.readFileSync(file))
    let abi = ABI.normalized(data)

    if (abi === null || abi === undefined) {
      throw Error(`No valid ABI in file: ${path.relative(process.cwd(), file)}`)
    }

    return new ABI(name, file, immutable.fromJS(abi))
  }
}
