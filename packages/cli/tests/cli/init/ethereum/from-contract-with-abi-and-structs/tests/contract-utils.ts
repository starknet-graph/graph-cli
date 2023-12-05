import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@starknet-graph/graph-ts"
import {
  LogOperatorSet,
  OwnershipTransferred
} from "../generated/Contract/Contract"

export function createLogOperatorSetEvent(
  owner: Address,
  operator: Address,
  trusted: boolean
): LogOperatorSet {
  let logOperatorSetEvent = changetype<LogOperatorSet>(newMockEvent())

  logOperatorSetEvent.parameters = new Array()

  logOperatorSetEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  logOperatorSetEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  logOperatorSetEvent.parameters.push(
    new ethereum.EventParam("trusted", ethereum.Value.fromBoolean(trusted))
  )

  return logOperatorSetEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}
