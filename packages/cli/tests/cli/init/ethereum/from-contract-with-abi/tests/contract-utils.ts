import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, BigInt, Address } from "@starknet-graph/graph-ts"
import {
  AuctionCreated,
  AuctionSuccessful,
  AuctionCancelled,
  ChangedPublicationFee,
  ChangedOwnerCut,
  Pause,
  Unpause,
  OwnershipTransferred
} from "../generated/Contract/Contract"

export function createAuctionCreatedEvent(
  id: Bytes,
  assetId: BigInt,
  seller: Address,
  priceInWei: BigInt,
  expiresAt: BigInt
): AuctionCreated {
  let auctionCreatedEvent = changetype<AuctionCreated>(newMockEvent())

  auctionCreatedEvent.parameters = new Array()

  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "assetId",
      ethereum.Value.fromUnsignedBigInt(assetId)
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "priceInWei",
      ethereum.Value.fromUnsignedBigInt(priceInWei)
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "expiresAt",
      ethereum.Value.fromUnsignedBigInt(expiresAt)
    )
  )

  return auctionCreatedEvent
}

export function createAuctionSuccessfulEvent(
  id: Bytes,
  assetId: BigInt,
  seller: Address,
  totalPrice: BigInt,
  winner: Address
): AuctionSuccessful {
  let auctionSuccessfulEvent = changetype<AuctionSuccessful>(newMockEvent())

  auctionSuccessfulEvent.parameters = new Array()

  auctionSuccessfulEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
  )
  auctionSuccessfulEvent.parameters.push(
    new ethereum.EventParam(
      "assetId",
      ethereum.Value.fromUnsignedBigInt(assetId)
    )
  )
  auctionSuccessfulEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  auctionSuccessfulEvent.parameters.push(
    new ethereum.EventParam(
      "totalPrice",
      ethereum.Value.fromUnsignedBigInt(totalPrice)
    )
  )
  auctionSuccessfulEvent.parameters.push(
    new ethereum.EventParam("winner", ethereum.Value.fromAddress(winner))
  )

  return auctionSuccessfulEvent
}

export function createAuctionCancelledEvent(
  id: Bytes,
  assetId: BigInt,
  seller: Address
): AuctionCancelled {
  let auctionCancelledEvent = changetype<AuctionCancelled>(newMockEvent())

  auctionCancelledEvent.parameters = new Array()

  auctionCancelledEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
  )
  auctionCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "assetId",
      ethereum.Value.fromUnsignedBigInt(assetId)
    )
  )
  auctionCancelledEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )

  return auctionCancelledEvent
}

export function createChangedPublicationFeeEvent(
  publicationFee: BigInt
): ChangedPublicationFee {
  let changedPublicationFeeEvent = changetype<ChangedPublicationFee>(
    newMockEvent()
  )

  changedPublicationFeeEvent.parameters = new Array()

  changedPublicationFeeEvent.parameters.push(
    new ethereum.EventParam(
      "publicationFee",
      ethereum.Value.fromUnsignedBigInt(publicationFee)
    )
  )

  return changedPublicationFeeEvent
}

export function createChangedOwnerCutEvent(ownerCut: BigInt): ChangedOwnerCut {
  let changedOwnerCutEvent = changetype<ChangedOwnerCut>(newMockEvent())

  changedOwnerCutEvent.parameters = new Array()

  changedOwnerCutEvent.parameters.push(
    new ethereum.EventParam(
      "ownerCut",
      ethereum.Value.fromUnsignedBigInt(ownerCut)
    )
  )

  return changedOwnerCutEvent
}

export function createPauseEvent(): Pause {
  let pauseEvent = changetype<Pause>(newMockEvent())

  pauseEvent.parameters = new Array()

  return pauseEvent
}

export function createUnpauseEvent(): Unpause {
  let unpauseEvent = changetype<Unpause>(newMockEvent())

  unpauseEvent.parameters = new Array()

  return unpauseEvent
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
