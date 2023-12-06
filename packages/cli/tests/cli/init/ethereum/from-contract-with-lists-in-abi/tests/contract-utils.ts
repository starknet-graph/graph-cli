import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@starknet-graph/graph-ts"
import { Airdropped } from "../generated/Contract/Contract"

export function createAirdroppedEvent(
  to: Array<Address>,
  quantity: BigInt,
  fromTokenId: BigInt
): Airdropped {
  let airdroppedEvent = changetype<Airdropped>(newMockEvent())

  airdroppedEvent.parameters = new Array()

  airdroppedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddressArray(to))
  )
  airdroppedEvent.parameters.push(
    new ethereum.EventParam(
      "quantity",
      ethereum.Value.fromUnsignedBigInt(quantity)
    )
  )
  airdroppedEvent.parameters.push(
    new ethereum.EventParam(
      "fromTokenId",
      ethereum.Value.fromUnsignedBigInt(fromTokenId)
    )
  )

  return airdroppedEvent
}
