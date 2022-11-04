enum MarketplaceError {
  ContractEventNotFound = 'contract_event_not_found',
  ContractReceiptFailure = 'contract_receipt_failure',
  ListItemFailure = 'list_item_failure',
  ListItemUnsuccessful = 'list_item_unsuccessful',
  RequiredAddress = 'required_address',
  RequiredBlobFile = 'required_blob_file',
  RequiredCollectionAddress = 'required_collection_address',
  RequiredListEvent = 'required_mint_event',
  RequiredListEventName = 'required_mint_event_name',
  RequiredTokenId = 'required_tokenId',
  RequiredPrice = 'required_price',
  RequiredItemId = 'required_itemId',
  RequiredListId = 'required_listId',
  RequiredTransactionType = 'required_transactionType',
  StoreListItemFailure = 'store_list_item_failure',
  StoreItemFailure = 'store_item_failure',
}

export default MarketplaceError;
