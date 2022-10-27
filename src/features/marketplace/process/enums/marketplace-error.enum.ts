enum MarketplaceError {
  ContractEventNotFound = 'contract_event_not_found',
  ContractReceiptFailure = 'contract_receipt_failure',
  ListItemFailure = 'list_item_failure',
  ListItemUnsuccessful = 'list_item_unsuccessful',
  RequiredAddress = 'required_address',
  RequiredBlobFile = 'required_blob_file',
  RequiredCollectionAddress = 'required_collection_address',
  RequiredMintEvent = 'required_mint_event',
  RequiredMintEventName = 'required_mint_event_name',
  RequiredTokenId = 'required_tokenId',
  RequiredPrice = 'required_price',
  RequiredItemId = 'required_itemId',
  StoreListItemFailure = 'store_list_item_failure',
  StoreItemFailure = 'store_item_failure',
}

export default MarketplaceError;
