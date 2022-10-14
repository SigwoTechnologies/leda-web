enum MintError {
  ContractEventNotFound = 'contract_event_not_found',
  ContractReceiptFailure = 'contract_receipt_failure',
  IpfsMetadataFailure = 'ipfs_metadata_failure',
  IpfsStoreFailure = 'ipfs_store_failure',
  MintNftFailure = 'mint_nft_failure',
  MintNftUnsuccessful = 'mint_nft_unsuccessful',
  RequiredAddress = 'required_address',
  RequiredBlobFile = 'required_blob_file',
  RequiredCid = 'required_cid',
  RequiredCollectionAddress = 'required_collection_address',
  RequiredDescription = 'required_description',
  RequiredImageUrl = 'required_imageUrl',
  RequiredIpfsObject = 'required_ipfs_object',
  RequiredMintEvent = 'required_mint_event',
  RequiredMintEventName = 'required_mint_event_name',
  RequiredName = 'required_name',
  RequiredRoyalty = 'required_royalty',
  RequiredTokenId = 'required_tokenId',
  RequiredUrl = 'required_url',
  StoreItemFailure = 'store_item_failure',
}

export default MintError;