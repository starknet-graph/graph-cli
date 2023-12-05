import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@starknet-graph/graph-ts"
import { Transfer, Transfer1, Transfer2 } from "../generated/Contract/Contract"

export function createTransferEvent(): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  return transferEvent
}

export function createTransfer1Event(to: Address): Transfer1 {
  let transfer1Event = changetype<Transfer1>(newMockEvent())

  transfer1Event.parameters = new Array()

  transfer1Event.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return transfer1Event
}

export function createTransfer2Event(
  from: Address,
  to: Address,
  to: Address
): Transfer2 {
  let transfer2Event = changetype<Transfer2>(newMockEvent())

  transfer2Event.parameters = new Array()

  transfer2Event.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transfer2Event.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transfer2Event.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return transfer2Event
}
