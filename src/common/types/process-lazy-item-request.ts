import { LazyProcessType } from '../minting/enums/lazy-process-type.enum';
import ItemImage from './item-image';

type ProcessLazyItemRequest = {
  itemId: string;
  address: string;
  image: ItemImage;
  minPrice: string;
  price: string;
  royalties: number;
  lazyProcessType: LazyProcessType;
  collection?: {
    name: string;
    description: string;
    image: ItemImage;
  };
};

export default ProcessLazyItemRequest;
