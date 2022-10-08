enum MintError {
  ContractEventNotFound = 0,
  ContractReceiptFailure = 1,
  IpfsMetadataFailure = 2,
  IpfsStoreFailure = 3,
  MintNftFailure = 4,
  MintNftUnsuccessful = 5,
  RequiredBlobFile = 6,
  RequiredCid = 7,
  RequireDescription = 8,
  RequiredImageUrl = 9,
  RequiredIpfsObject = 10,
  RequiredName = 11,
  RequiredTokenId = 12,
  RequireMintEvent = 13,
  RequireMintEventName = 14,
  RequireRoyalty = 15,
  RequireUrl = 16,
}

export default MintError;
