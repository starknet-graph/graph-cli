const tsCodegen = require('../../../codegen/typescript')
const typesCodegen = require('../../../codegen/types')
const util = require('../../../codegen/util')

module.exports = class AbiCodeGenerator {
  constructor(abi) {
    this.abi = abi
  }

  generateModuleImports() {
    let imports = [
      tsCodegen.moduleImports(
        [
          'starknet',
          'Bytes',
        ],
        '@graphprotocol/graph-ts',
      )
    ]
    return imports
  }

  generateTypes() {
    return [
      ...this._generateEventTypes(),
    ]
  }

  _generateEventTypes() {
    // Enumerate events with duplicate names
    
    let events = util.disambiguateNames({
      values: this.abi.data.filter(member => member.get('type') === 'event'),
      getName: event => event.get('name'),
      setName: (event, name) => event.set('_alias', name),
    })

    events = events
      .map(event => {
        let eventClassName = event.get('_alias')

        // First, generate a class with the event data getters
        let paramsClassName = eventClassName + '__Params'
        let paramsClass = tsCodegen.klass(paramsClassName, { export: true })
        paramsClass.addMember(tsCodegen.klassMember('_event', eventClassName))
        paramsClass.addMethod(
          tsCodegen.method(
            `constructor`,
            [tsCodegen.param(`event`, eventClassName)],
            null,
            `this._event = event`,
          ),
        )
        
        // Enumerate data with duplicate names
        let eventProperties = util.disambiguateNames({
          values: event.get('data'),
          getName: (property) => property.get('name'),
          setName: (property, name) => property.set('name', name),
        })

        eventProperties.forEach((property, index) => {
          // Generate getters for event data
          // Only support getter for felt => Bytes
          if (property.get('type') !== 'felt') {
            return;
          }

          let paramObject = this._generateEventGetter(
            property,
            index,
          )

          paramsClass.addMethod(paramObject.getter)
        })

        // Then, generate the event class itself
        let klass = tsCodegen.klass(eventClassName, {
          export: true,
          extends: 'starknet.Event',
        })

        klass.addMethod(
          tsCodegen.method(
            `get params`,
            [],
            tsCodegen.namedType(paramsClassName),
            `return new ${paramsClassName}(this)`,
          ),
        )

        return [klass, paramsClass]
      })

    return events
      .reduce(
        // flatten the array
        (array, classes) => array.concat(classes),
        [],
      )
  }

  _generateEventGetter(event, index) {
    // Get name and type of the param, adjusting for indexed params and missing names
    let name = event.get('name')
    let valueType = event.get('type')

    // Only felts -> Bytes is supported
    // Generate getters for the param
    return {
      name: [],
      getter: tsCodegen.method(
        `get ${name}`,
        [],
        typesCodegen.ascTypeForProtocol('starknet', valueType), 
        `return this._event.data[${index}]`,
      ),
      classes: [],
    }
  }
}