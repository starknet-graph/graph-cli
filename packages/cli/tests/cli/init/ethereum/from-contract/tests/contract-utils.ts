import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes } from "@starknet-graph/graph-ts"
import { Upgrade, OwnerUpdate } from "../generated/Contract/Contract"

export function createUpgradeEvent(
  newContract: Address,
  initializedWith: Bytes
): Upgrade {
  let upgradeEvent = changetype<Upgrade>(newMockEvent())

  upgradeEvent.parameters = new Array()

  upgradeEvent.parameters.push(
    new ethereum.EventParam(
      "newContract",
      ethereum.Value.fromAddress(newContract)
    )
  )
  upgradeEvent.parameters.push(
    new ethereum.EventParam(
      "initializedWith",
      ethereum.Value.fromBytes(initializedWith)
    )
  )

  return upgradeEvent
}

export function createOwnerUpdateEvent(
  _prevOwner: Address,
  _newOwner: Address
): OwnerUpdate {
  let ownerUpdateEvent = changetype<OwnerUpdate>(newMockEvent())

  ownerUpdateEvent.parameters = new Array()

  ownerUpdateEvent.parameters.push(
    new ethereum.EventParam(
      "_prevOwner",
      ethereum.Value.fromAddress(_prevOwner)
    )
  )
  ownerUpdateEvent.parameters.push(
    new ethereum.EventParam("_newOwner", ethereum.Value.fromAddress(_newOwner))
  )

  return ownerUpdateEvent
}
