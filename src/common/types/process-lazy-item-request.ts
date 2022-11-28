import ItemImage from './item-image';

type ProcessLazyItemRequest = {
  itemId: string;
  address: string;
  image: ItemImage;
  minPrice: string;
  royalties: number;
};

export default ProcessLazyItemRequest;
