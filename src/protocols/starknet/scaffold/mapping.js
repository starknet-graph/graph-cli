const generateFieldAssignment = path =>
  `entity.${path.join('_')} = event.params.${path.join('.')}`

const generateFieldAssignments = ({ index, input }) =>
  input.type === 'tuple'
    ? util
        .unrollTuple({ value: input, index, path: [input.name || `param${index}`] })
        .map(({ path }) => generateFieldAssignment(path))
    : generateFieldAssignment([input.name || `param${index}`])

const generateEventFieldAssignments = event =>
  event.data.reduce(
    (acc, input, index) => acc.concat(generateFieldAssignments({ input, index })),
    [],
  )

const generatePlaceholderHandlers = ({ abi, events, contractName }) =>
  `
  import { BigInt } from "@graphprotocol/graph-ts"
  import { ${events.map(event => event._alias)} }
    from '../generated/${contractName}/${contractName}'
  import { ExampleEntity } from '../generated/schema'

  ${events
    .map((event, index) =>
      index === 0
        ? `
    export function handle${event._alias}(event: ${event._alias}): void {
      if (!event.data.length) {
        return
      }

      // Entities can be loaded from the store using a string ID; this ID
      // needs to be unique across all entities of the same type
      let entity = ExampleEntity.load(event.data[0].toHex())

      // Entities only exist after they have been saved to the store;
      // \`null\` checks allow to create entities on demand
      if (!entity) {
        entity = new ExampleEntity(event.data[0].toHex())
      }

      entity.count = new BigInt(1)

      // Entity fields can be set based on event parameters
      ${generateEventFieldAssignments(event)
        .slice(0, 2)
        .join('\n')}

      // Entities can be written to the store with \`.save()\`
      entity.save()

      // Note: If a handler doesn't require existing field values, it is faster
      // _not_ to load the entity from the store. Instead, create it fresh with
      // \`new Entity(...)\`, set the fields that should be updated and save the
      // entity back to the store. Fields that were not set or unset remain
      // unchanged, allowing for partial updates to be applied.
    }
    `
        : `
export function handle${event._alias}(event: ${event._alias}): void {}
`,
    )
    .join('\n')}`

module.exports = {
  generatePlaceholderHandlers,
}
