import Breadcrumb from '@components/breadcrumb';
import SEO from '@components/seo';
import { ProductDetailsArea } from '@containers/item-details/item-details';
import { getFormattedName } from '@utils/getFormattedName';
import { useEffect } from 'react';
import { setSelectedItem } from '../../features/marketplace/store/marketplace.slice';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import { Item } from '../../types/item';

type Props = {
  item: Item;
};

const ProductDetails = ({ item }: Props) => {
  const dispatch = useAppDispatch();
  const itemExist = Object.entries(item).length;

  useEffect(() => {
    if (item.itemId) {
      dispatch(setSelectedItem(item));
    }
  }, [dispatch, item]);

  const pageTitleWindow = itemExist
    ? `${item?.name} #${item?.itemId?.slice(0, 5)}`
    : 'Item Details';

  const pageTitleBreadcrumb = 'NFT Details Page';

  const currentPage = itemExist
    ? `NFT - ${getFormattedName(item?.name)} #${item.itemId?.slice(0, 4)}`
    : 'Item Details';

  return (
    <div>
      <SEO
        pageTitle={pageTitleWindow}
        pageMeta={{
          nftName: item?.name,
          nftAuthor: item?.author?.address,
          nftDescription: item?.description,
          nftImage: item.image?.url,
        }}
      />
      <Breadcrumb pageTitle={pageTitleBreadcrumb} currentPage={currentPage} />
      <ProductDetailsArea />
    </div>
  );
};

type Params = {
  params: { itemId: string };
};

export async function getServerSideProps({ params }: Params) {
  const url = `${process.env.NEXT_PUBLIC_LEDA_API_URL}/items/${params.itemId}`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = await fetch(url, requestOptions);
  const item = await res.json();

  return {
    props: {
      item: res.status === 404 ? {} : item,
    },
  };
}

export default ProductDetails;
