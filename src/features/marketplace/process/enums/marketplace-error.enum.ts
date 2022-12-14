enum MarketplaceError {
  ApproveCommandFailure = 'approve_command_failure',
  ChangePriceItemFailure = 'list_change_price_item_failure',
  ChangeStatusItemFailure = 'change_status_item_failure',
  ChangeStatusUnsuccessful = 'change_status_item_unsuccessful',
  ContractEventNotFound = 'contract_event_not_found',
  ContractReceiptFailure = 'contract_receipt_failure',
  GenerateJupVoucherCommand = 'generate_jup_voucher_command_failure',
  GenerateVoucherCommandFailure = 'generate_voucher_command_failure',
  ListItemFailure = 'list_item_failure',
  ListItemUnsuccessful = 'list_item_unsuccessful',
  RequiredAddress = 'required_address',
  RequiredBlobFile = 'required_blob_file',
  RequiredCid = 'required_cid',
  RequiredCollectionAddress = 'required_collection_address',
  RequiredContractApproval = 'required_contract_approval',
  RequiredImageUrl = 'required_imageUrl',
  RequiredItemId = 'required_itemId',
  RequiredLazyProcessType = 'required_lazy_process_type',
  RequiredListEvent = 'required_mint_event',
  RequiredListEventName = 'required_mint_event_name',
  RequiredListId = 'required_listId',
  RequiredOwnerAddress = 'required_owner_address',
  RequiredPrice = 'required_price',
  RequiredRoyalty = 'required_royalty',
  RequiredStakingRewards = 'required_staking_rewards',
  RequiredStatus = 'required_status',
  RequiredTokenId = 'required_tokenId',
  RequiredVoucher = 'required_voucher',
  RequiredVoucherCreator = 'required_voucher_creator',
  RequiredVoucherMinPrice = 'required_voucher_min_price',
  RequiredVoucherRoyalties = 'required_voucher_royalties',
  RequiredVoucherSignature = 'required_voucher_signature',
  RequiredVoucherUri = 'required_voucher_uri',
  StoreBuyItemFailure = 'store_buy_item_failure',
  StoreDelistItemFailure = 'store_delist_item_failure',
  StoreListItemFailure = 'store_list_item_failure',
  StoreVoucherCommandFailure = 'store_voucher_command_failure',
}

export default MarketplaceError;
