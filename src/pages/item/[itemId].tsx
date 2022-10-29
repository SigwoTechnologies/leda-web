import Breadcrumb from '@components/breadcrumb';
import SEO from '@components/seo';
import ProductDetailsArea from '@containers/item-details/item-details';
import { useEffect } from 'react';
import { findById } from '../../features/leda-nft/store/leda-nft.actions';
import { selectById } from '../../features/leda-nft/store/leda-nft.slice';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';

type Props = {
  itemId: string;
};

const ProductDetails = ({ itemId }: Props) => {
  const dispatch = useAppDispatch();
  const item = useAppSelector((state) => selectById(state, itemId));

  useEffect(() => {
    if (!item) {
      dispatch(findById(itemId));
    }
  }, [dispatch, itemId, item]);

  return (
    <>
      <SEO
        pageTitle={
          item
            ? `${item?.name}#${item?.itemId.slice(0, 5)} - Jhon Doe | LEDA`
            : 'Item Details | LEDA'
        }
      />
      <Breadcrumb
        pageTitle={
          item
            ? `${item.owner.address.substring(0, 7)}...${item.owner.address.substring(
                item.owner.address.length - 4,
                item.owner.address.length
              )} - NFT`
            : 'Item Details'
        }
        currentPage={item ? `NFT - ${item.name}#${item.itemId.slice(0, 4)}` : 'Item Details'}
      />
      {item && <ProductDetailsArea item={item} />}
    </>
  );
};

type Params = {
  params: { itemId: string };
};

export async function getServerSideProps({ params }: Params) {
  return {
    props: {
      itemId: params.itemId,
    },
  };
}

export default ProductDetails;
