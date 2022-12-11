import MarketplaceError from '../../features/marketplace/process/enums/marketplace-error.enum';
import MintError from '../minting/enums/mint-error.enum';
import { CustomErrorType } from '../types/error-types';

const constants = {
  tokenKey: 'authToken',
  errors: {
    minting: {
      [MintError.ActivateItemFailure]: {
        code: MintError.ActivateItemFailure,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.ActivateItemFailure}'`,
      },
      [MintError.ContractEventNotFound]: {
        code: MintError.ContractEventNotFound,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.ContractEventNotFound}'`,
      },
      [MintError.ContractReceiptFailure]: {
        code: MintError.ContractReceiptFailure,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.ContractReceiptFailure}'`,
      },
      [MintError.GenerateVoucherCommandFailure]: {
        code: MintError.GenerateVoucherCommandFailure,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.GenerateVoucherCommandFailure}'`,
      },
      [MintError.GetVoucherCommandFailure]: {
        code: MintError.GetVoucherCommandFailure,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.GetVoucherCommandFailure}'`,
      },
      [MintError.IpfsMetadataFailure]: {
        code: MintError.IpfsMetadataFailure,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.IpfsMetadataFailure}'`,
      },
      [MintError.IpfsStoreFailure]: {
        code: MintError.IpfsStoreFailure,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.IpfsStoreFailure}'`,
      },
      [MintError.LazyMintFailure]: {
        code: MintError.LazyMintFailure,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.LazyMintFailure}'`,
      },
      [MintError.LazyMintNftUnsuccessful]: {
        code: MintError.LazyMintNftUnsuccessful,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.LazyMintNftUnsuccessful}'`,
      },
      [MintError.MintNftFailure]: {
        code: MintError.MintNftFailure,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.MintNftFailure}'`,
      },
      [MintError.MintNftUnsuccessful]: {
        code: MintError.MintNftUnsuccessful,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.MintNftUnsuccessful}'`,
      },
      [MintError.RedeemFailure]: {
        code: MintError.RedeemFailure,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.RedeemFailure}'`,
      },
      [MintError.RequiredAddress]: {
        code: MintError.RequiredAddress,
        message:
          'An error has occurred during the nft creation. Please make sure you are connected to your wallet and try again',
      },
      [MintError.RequiredBlobFile]: {
        code: MintError.RequiredBlobFile,
        message:
          'An error has occurred during the nft creation. Please make sure you have attached an image before submitting the NFT.',
      },
      [MintError.RequiredCid]: {
        code: MintError.RequiredCid,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.RequiredCid}'`,
      },
      [MintError.RequiredCollectionAddress]: {
        code: MintError.RequiredCollectionAddress,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.RequiredCollectionAddress}'`,
      },
      [MintError.RequiredDescription]: {
        code: MintError.RequiredDescription,
        message:
          'An error has occurred during the nft creation. Please make sure you enter a description before submitting the NFT.',
      },
      [MintError.RequiredImageUrl]: {
        code: MintError.RequiredImageUrl,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.RequiredImageUrl}'`,
      },
      [MintError.RequiredIpfsObject]: {
        code: MintError.RequiredIpfsObject,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.RequiredIpfsObject}'`,
      },
      [MintError.RequiredItemId]: {
        code: MintError.RequiredItemId,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.RequiredItemId}'`,
      },
      [MintError.RequiredLazyProcessType]: {
        code: MintError.RequiredLazyProcessType,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.RequiredLazyProcessType}'`,
      },
      [MintError.RequiredMintEvent]: {
        code: MintError.RequiredMintEvent,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.RequiredMintEvent}'`,
      },
      [MintError.RequiredMintEventName]: {
        code: MintError.RequiredMintEventName,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.RequiredMintEventName}'`,
      },
      [MintError.RequiredName]: {
        code: MintError.RequiredName,
        message:
          'An error has occurred during the nft creation. Please make sure you enter a name before submitting the NFT.',
      },
      [MintError.RequiredPrice]: {
        code: MintError.RequiredPrice,
        message:
          'An error has occurred during the nft creation. Please make sure you enter a price value before submitting the NFT.',
      },
      [MintError.RequiredRoyalty]: {
        code: MintError.RequiredRoyalty,
        message:
          'An error has occurred during the nft creation. Please make sure you enter a royalty value before submitting the NFT.',
      },
      [MintError.RequiredTags]: {
        code: MintError.RequiredTags,
        message:
          'An error has occurred during the nft creation. Please make sure to have attached at least one tag before submitting the NFT.',
      },
      [MintError.RequiredTokenId]: {
        code: MintError.RequiredTokenId,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.RequiredTokenId}'`,
      },
      [MintError.RequiredUrl]: {
        code: MintError.RequiredUrl,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.RequiredUrl}'`,
      },
      [MintError.RequiredVoucher]: {
        code: MintError.RequiredVoucher,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.RequiredVoucher}'`,
      },
      [MintError.RequiredVoucherCreator]: {
        code: MintError.RequiredVoucherCreator,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.RequiredVoucherCreator}'`,
      },
      [MintError.RequiredVoucherMinPrice]: {
        code: MintError.RequiredVoucherMinPrice,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.RequiredVoucherMinPrice}'`,
      },
      [MintError.RequiredVoucherRoyalties]: {
        code: MintError.RequiredVoucherRoyalties,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.RequiredVoucherRoyalties}'`,
      },
      [MintError.RequiredVoucherSignature]: {
        code: MintError.RequiredVoucherSignature,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.RequiredVoucherSignature}'`,
      },
      [MintError.RequiredVoucherUri]: {
        code: MintError.RequiredVoucherUri,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.RequiredVoucherUri}'`,
      },
      [MintError.StoreDraftItemFailure]: {
        code: MintError.StoreDraftItemFailure,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.StoreDraftItemFailure}'`,
      },
      [MintError.StoreVoucherCommandFailure]: {
        code: MintError.StoreVoucherCommandFailure,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.StoreVoucherCommandFailure}'`,
      },
      [MintError.TransferCommandFailure]: {
        code: MintError.TransferCommandFailure,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.TransferCommandFailure}'`,
      },
    } as CustomErrorType,
    marketplace: {
      [MarketplaceError.ChangePriceItemFailure]: {
        code: MarketplaceError.ChangePriceItemFailure,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MarketplaceError.ChangePriceItemFailure}'`,
      },
      [MarketplaceError.ChangeStatusItemFailure]: {
        code: MarketplaceError.ChangeStatusItemFailure,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MarketplaceError.ChangeStatusItemFailure}'`,
      },
      [MarketplaceError.ChangeStatusUnsuccessful]: {
        code: MarketplaceError.ChangeStatusUnsuccessful,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MarketplaceError.ChangeStatusUnsuccessful}'`,
      },
      [MarketplaceError.ContractEventNotFound]: {
        code: MarketplaceError.ContractEventNotFound,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MarketplaceError.ContractEventNotFound}'`,
      },
      [MarketplaceError.ContractReceiptFailure]: {
        code: MarketplaceError.ContractReceiptFailure,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MarketplaceError.ContractReceiptFailure}'`,
      },
      [MarketplaceError.GenerateVoucherCommandFailure]: {
        code: MarketplaceError.GenerateVoucherCommandFailure,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MarketplaceError.GenerateVoucherCommandFailure}'`,
      },
      [MarketplaceError.ListItemFailure]: {
        code: MarketplaceError.ListItemFailure,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MarketplaceError.ListItemFailure}'`,
      },
      [MarketplaceError.ListItemUnsuccessful]: {
        code: MarketplaceError.ListItemUnsuccessful,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MarketplaceError.ListItemUnsuccessful}'`,
      },
      [MarketplaceError.ListItemUnsuccessful]: {
        code: MarketplaceError.ListItemUnsuccessful,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MarketplaceError.ListItemUnsuccessful}'`,
      },
      [MarketplaceError.RequiredAddress]: {
        code: MarketplaceError.RequiredAddress,
        message:
          'An error has occurred during the nft creation. Please make sure you are connected to your wallet and try again',
      },
      [MarketplaceError.RequiredBlobFile]: {
        code: MarketplaceError.RequiredBlobFile,
        message:
          'An error has occurred during the nft creation. Please make sure you have attached an image before submitting the NFT.',
      },
      [MarketplaceError.RequiredCid]: {
        code: MarketplaceError.RequiredCid,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MarketplaceError.RequiredCid}'`,
      },
      [MarketplaceError.RequiredCollectionAddress]: {
        code: MarketplaceError.RequiredCollectionAddress,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MarketplaceError.RequiredCollectionAddress}'`,
      },
      [MarketplaceError.RequiredContractApproval]: {
        code: MarketplaceError.RequiredContractApproval,
        message:
          'An error has occurred during the nft creation. Please make sure your contract address is approved.',
      },
      [MarketplaceError.RequiredImageUrl]: {
        code: MarketplaceError.RequiredImageUrl,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MarketplaceError.RequiredImageUrl}'`,
      },
      [MarketplaceError.RequiredItemId]: {
        code: MarketplaceError.RequiredItemId,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MarketplaceError.RequiredItemId}'`,
      },
      [MarketplaceError.RequiredLazyProcessType]: {
        code: MarketplaceError.RequiredLazyProcessType,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MarketplaceError.RequiredLazyProcessType}'`,
      },
      [MarketplaceError.RequiredListEvent]: {
        code: MarketplaceError.RequiredListEvent,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MarketplaceError.RequiredListEvent}'`,
      },
      [MarketplaceError.RequiredListEventName]: {
        code: MarketplaceError.RequiredListEventName,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MarketplaceError.RequiredListEventName}'`,
      },
      [MarketplaceError.RequiredListId]: {
        code: MarketplaceError.RequiredListId,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MarketplaceError.RequiredListId}'`,
      },
      [MarketplaceError.RequiredOwnerAddress]: {
        code: MarketplaceError.RequiredOwnerAddress,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MarketplaceError.RequiredOwnerAddress}'`,
      },
      [MarketplaceError.RequiredPrice]: {
        code: MarketplaceError.RequiredPrice,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MarketplaceError.RequiredPrice}'`,
      },
      [MarketplaceError.RequiredRoyalty]: {
        code: MarketplaceError.RequiredRoyalty,
        message:
          'An error has occurred during the nft creation. Please make sure you enter a royalty value before submitting the NFT.',
      },
      [MarketplaceError.RequiredStatus]: {
        code: MarketplaceError.RequiredStatus,
        message:
          'An error has occurred during the nft creation. Please make sure you enter a status value before submitting the NFT.',
      },
      [MarketplaceError.RequiredTokenId]: {
        code: MarketplaceError.RequiredTokenId,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MarketplaceError.RequiredTokenId}'`,
      },
      [MarketplaceError.RequiredVoucher]: {
        code: MarketplaceError.RequiredVoucher,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MarketplaceError.RequiredVoucher}'`,
      },
      [MarketplaceError.RequiredVoucherCreator]: {
        code: MarketplaceError.RequiredVoucherCreator,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MarketplaceError.RequiredVoucherCreator}'`,
      },
      [MarketplaceError.RequiredVoucherMinPrice]: {
        code: MarketplaceError.RequiredVoucherMinPrice,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MarketplaceError.RequiredVoucherMinPrice}'`,
      },
      [MarketplaceError.RequiredVoucherRoyalties]: {
        code: MarketplaceError.RequiredVoucherRoyalties,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MarketplaceError.RequiredVoucherRoyalties}'`,
      },
      [MarketplaceError.RequiredVoucherSignature]: {
        code: MarketplaceError.RequiredVoucherSignature,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MarketplaceError.RequiredVoucherSignature}'`,
      },
      [MarketplaceError.RequiredVoucherUri]: {
        code: MarketplaceError.RequiredVoucherUri,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MarketplaceError.RequiredVoucherUri}'`,
      },
      [MarketplaceError.StoreBuyItemFailure]: {
        code: MarketplaceError.StoreBuyItemFailure,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MarketplaceError.StoreBuyItemFailure}'`,
      },
      [MarketplaceError.StoreDelistItemFailure]: {
        code: MarketplaceError.StoreDelistItemFailure,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MarketplaceError.StoreDelistItemFailure}'`,
      },
      [MarketplaceError.StoreListItemFailure]: {
        code: MarketplaceError.StoreListItemFailure,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MarketplaceError.StoreListItemFailure}'`,
      },
      [MarketplaceError.StoreVoucherCommandFailure]: {
        code: MarketplaceError.StoreVoucherCommandFailure,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MarketplaceError.StoreVoucherCommandFailure}'`,
      },
    } as CustomErrorType,
  },
};

export default constants;
