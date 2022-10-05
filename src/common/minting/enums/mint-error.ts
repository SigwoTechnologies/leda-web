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
  RequiredName,
  RequireMintEvent,
  RequireMintEventName,
  RequireRoyalty,
  RequireUrl,
}

export default MintError;
