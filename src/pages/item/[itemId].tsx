import Breadcrumb from '@components/breadcrumb';
import SEO from '@components/seo';
import { ProductDetailsArea } from '@containers/item-details/item-details';
import { useEffect } from 'react';
import { findById } from '../../features/leda-nft/store/leda-nft.actions';
import { selectById } from '../../features/leda-nft/store/leda-nft.slice';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';
import { formattedAddress } from '../../utils/getFormattedAddress';

type Props = {
  itemId: string;
  metaData: {
    name: string;
    description: string;
    author: {
      address: string;
    };
    image: {
      url: string;
    };
  };
};

const ProductDetails = ({ itemId, metaData }: Props) => {
  const dispatch = useAppDispatch();
  const item = useAppSelector((state) => selectById(state, itemId));

  useEffect(() => {
    dispatch(findById(itemId));
  }, [itemId, dispatch]);

  const pageTitleWindow = item ? `${item?.name} #${item?.itemId.slice(0, 5)}` : 'Item Details';

  const pageTitleBreadcrumb = 'NFT Details Page';

  const currentPage = item ? `NFT - ${item.name} #${item.itemId.slice(0, 4)}` : 'Item Details';

  return (
    <div>
      <SEO
        pageTitle={pageTitleWindow}
        pageMeta={{
          nftName: metaData?.name,
          nftAuthor: metaData?.author.address,
          nftDescription: metaData?.description,
          nftImage: metaData.image.url,
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
  const resJson = await res.json();
  return {
    props: {
      itemId: params.itemId,
      metaData: resJson,
    },
  };
}

export default ProductDetails;
