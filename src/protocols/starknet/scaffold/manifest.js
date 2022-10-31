const { abiEvents } = require('../../../scaffold/schema')
const { strings } = require('gluegun')
const ABI = require('../abi')

const source = ({ contract, contractName }) => `
      address: '${contract}'
      startBlock: 0`

const mapping = ({ abi, contractName }) => `
      apiVersion: 0.0.6
      language: wasm/assemblyscript
      entities:
        ${abiEvents(abi)
          .map(event => `- ${event.get('_alias')}`)
          .join('\n        ')}
      abis:
        - name: ${contractName}
          file: ./abis/${contractName}.json
      eventHandlers:
        ${abiEvents(abi)
          .map(
            event => `
        - event: ${ABI.eventSignature(event)}
          handler: handle${event.get('_alias')}`,
          )
          .join('')}
      file: ./src/${strings.kebabCase(contractName)}.ts`

module.exports = {
  source,
  mapping,
}
