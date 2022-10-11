import MintError from '../minting/enums/mint-error.enum';
import { MintErrorType } from '../types/error-types';

const constants = {
  token: 'TOKEN',
  errors: {
    minting: {
      [MintError.ContractEventNotFound]: {
        code: MintError.ContractEventNotFound,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.ContractEventNotFound}'`,
      },
      [MintError.ContractReceiptFailure]: {
        code: MintError.ContractReceiptFailure,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.ContractReceiptFailure}'`,
      },
      [MintError.IpfsMetadataFailure]: {
        code: MintError.IpfsMetadataFailure,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.IpfsMetadataFailure}'`,
      },
      [MintError.IpfsStoreFailure]: {
        code: MintError.IpfsStoreFailure,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.IpfsStoreFailure}'`,
      },
      [MintError.MintNftFailure]: {
        code: MintError.MintNftFailure,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.MintNftFailure}'`,
      },
      [MintError.MintNftUnsuccessful]: {
        code: MintError.MintNftUnsuccessful,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.MintNftUnsuccessful}'`,
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
      [MintError.RequiredRoyalty]: {
        code: MintError.RequiredRoyalty,
        message:
          'An error has occurred during the nft creation. Please make sure you enter a royalty value before submitting the NFT.',
      },
      [MintError.RequiredTokenId]: {
        code: MintError.RequiredTokenId,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.RequiredTokenId}'`,
      },
      [MintError.RequiredUrl]: {
        code: MintError.RequiredUrl,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.RequiredUrl}'`,
      },
      [MintError.StoreItemFailure]: {
        code: MintError.StoreItemFailure,
        message: `An error has occurred during the nft creation. Please contact our support team and refer to this error with the following code: '${MintError.StoreItemFailure}'`,
      },
    } as MintErrorType,
  },
};

export default constants;
