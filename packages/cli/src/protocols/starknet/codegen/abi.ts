import * as typesCodegen from '../../../codegen/types';
import * as tsCodegen from '../../../codegen/typescript';
import * as util from '../../../codegen/util';
import ABI from '../abi';

export default class AbiCodeGenerator {
  constructor(private abi: ABI) {
    this.abi = abi;
  }

  generateModuleImports() {
    return [tsCodegen.moduleImports(['starknet', 'BigInt', 'Felt'], '@starknet-graph/graph-ts')];
  }

  generateTypes() {
    return [...this._generateEventTypes()];
  }

  _generateEventTypes() {
    // Enumerate events with duplicate names
    let events = util.disambiguateNames({
      // @ts-expect-error improve typings of disambiguateNames to handle iterables
      values: this.abi.data.filter(member => member.get('type') === 'event'),
      // @ts-expect-error improve typings of disambiguateNames to handle iterables
      getName: event => event.get('name'),
      // @ts-expect-error improve typings of disambiguateNames to handle iterables
      setName: (event, name) => event.set('_alias', name),
    }) as any[];

    events = events.map(event => {
      const eventClassName = event.get('_alias');

      // First, generate a class with the event data getters
      const paramsClassName = eventClassName + '__Params';
      const paramsClass = tsCodegen.klass(paramsClassName, { export: true });
      paramsClass.addMember(tsCodegen.klassMember('_event', eventClassName));
      paramsClass.addMethod(
        tsCodegen.method(
          `constructor`,
          [tsCodegen.param(`event`, eventClassName)],
          null,
          `this._event = event`,
        ),
      );

      // Enumerate data with duplicate names
      const eventProperties = util.disambiguateNames({
        values: event.get('data'),
        // @ts-expect-error improve typings of disambiguateNames to handle iterables
        getName: property => property.get('name'),
        // @ts-expect-error improve typings of disambiguateNames to handle iterables
        setName: (property, name) => property.set('name', name),
      }) as any[];

      let eventDataSlot = 0;
      for (const property of eventProperties) {
        const [paramObject, consumed] = this._generateEventGetter(property, eventDataSlot);
        eventDataSlot += consumed;
        paramsClass.addMethod(paramObject.getter);
      }

      // Then, generate the event class itself
      const klass = tsCodegen.klass(eventClassName, {
        export: true,
        extends: 'starknet.Event',
      });
      klass.addMethod(
        tsCodegen.method(
          `get params`,
          [],
          tsCodegen.namedType(paramsClassName),
          `return new ${paramsClassName}(this)`,
        ),
      );

      return [klass, paramsClass];
    });

    return events.reduce(
      // flatten the array
      (array, classes) => array.concat(classes),
      [],
    );
  }

  _generateEventGetter(event: any, index: number): [any, number] {
    // Get name and type of the param, adjusting for indexed params and missing names
    const name = event.get('name');
    const valueType = event.get('type');

    let code: string;
    let consumed: number;
    if (valueType === 'Uint256') {
      code =
        `return changetype<Felt>(this._event.data[${index + 1}].slice())` +
        `.intoBigInt()` +
        `.leftShift(128)` +
        `.plus(changetype<Felt>(this._event.data[${index}].slice()).intoBigInt())`;
      consumed = 2;
    } else {
      code = `return changetype<Felt>(this._event.data[${index}])`;
      consumed = 1;
    }

    return [
      {
        name: [],
        getter: tsCodegen.method(
          `get ${name}`,
          [],
          typesCodegen.ascTypeForProtocol('starknet', valueType),
          code,
        ),
        classes: [],
      },
      consumed,
    ];
  }
}
