import { BigInt } from "@starknet-graph/graph-ts"
import {
  Contract,
  AuctionCreated,
  AuctionSuccessful,
  AuctionCancelled,
  ChangedPublicationFee,
  ChangedOwnerCut,
  Pause,
  Unpause,
  OwnershipTransferred
} from "../generated/Contract/Contract"
import { ExampleEntity } from "../generated/schema"

export function handleAuctionCreated(event: AuctionCreated): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from)

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.Contract_id = event.params.id
  entity.assetId = event.params.assetId

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.nonFungibleRegistry(...)
  // - contract.acceptedToken(...)
  // - contract.paused(...)
  // - contract.ownerCutPercentage(...)
  // - contract.owner(...)
  // - contract.publicationFeeInWei(...)
  // - contract.auctionByAssetId(...)
}

export function handleAuctionSuccessful(event: AuctionSuccessful): void {}

export function handleAuctionCancelled(event: AuctionCancelled): void {}

export function handleChangedPublicationFee(
  event: ChangedPublicationFee
): void {}

export function handleChangedOwnerCut(event: ChangedOwnerCut): void {}

export function handlePause(event: Pause): void {}

export function handleUnpause(event: Unpause): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}
