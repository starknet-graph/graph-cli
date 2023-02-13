import { strings } from 'gluegun';
import { abiEvents } from '../../../scaffold/schema';
import ABI from '../abi';

export const source = ({ contract, startBlock }: { contract: string; startBlock?: string }) => `
      address: '${contract}'
      startBlock: ${startBlock ?? '0'}`;

export const mapping = ({ abi, contractName }: { abi: ABI; contractName: string }) => `
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
      file: ./src/${strings.kebabCase(contractName)}.ts`;
