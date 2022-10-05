enum MintError {
  ContractEventNotFound,
  ContractReceiptFailure,
  IpfsMetadataFailure,
  IpfsStoreFailure,
  MintNftFailure,
  MintNftUnsuccessful,
  RequiredBlobFile,
  RequireDescription,
  RequiredIpfsId,
  RequiredIpfsObject,
  RequiredIpfsUrl,
  RequiredName,
  RequiredTokenId,
  RequireMintEvent,
  RequireMintEventName,
  RequireRoyalty,
  RequireUrl,
}

export default MintError;
