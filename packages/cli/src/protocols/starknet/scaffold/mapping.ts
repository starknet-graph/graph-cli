import * as util from '../../../codegen/util';

const generateFieldAssignment = (path: string[]) =>
  `entity.${path.join('_')} = event.params.${path.join('.')}`;

const generateFieldAssignments = ({ index, input }: { index: number; input: any }) =>
  input.type === 'tuple'
    ? util
        .unrollTuple({ value: input, index, path: [input.name || `param${index}`] })
        .map(({ path }: { path: string[] }) => generateFieldAssignment(path))
    : generateFieldAssignment([input.name || `param${index}`]);

const generateEventFieldAssignments = (event: any) =>
  event.data.reduce(
    (acc: string, input: any, index: number) =>
      acc.concat(generateFieldAssignments({ input, index })),
    [],
  );

export const generatePlaceholderHandlers = ({
  events,
  contractName,
}: {
  events: any[];
  contractName: string;
}) =>
  `
  import { BigInt } from "@starknet-graph/graph-ts"
  import { ${events.map(event => event._alias)} }
    from '../generated/${contractName}/${contractName}'
  import { ExampleEntity } from '../generated/schema'
  ${events
    .map((event, index) =>
      index === 0
        ? `
    export function handle${event._alias}(event: ${event._alias}): void {
      // Entities can be loaded from the store using a string ID; this ID
      // needs to be unique across all entities of the same type
      let entity = ExampleEntity.load(event.block.hash)

      // Entities only exist after they have been saved to the store;
      // \`null\` checks allow to create entities on demand
      if (!entity) {
        entity = new ExampleEntity(event.block.hash)

        // Entity fields can be set using simple assignments
        entity.count = BigInt.fromI32(0)
      }

      // BigInt and BigDecimal math are supported
      entity.count = entity.count.plus(BigInt.fromI32(1))

      // Entity fields can be set based on event parameters
      ${generateEventFieldAssignments(event).slice(0, 2).join('\n')}

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
    .join('\n')}`;
