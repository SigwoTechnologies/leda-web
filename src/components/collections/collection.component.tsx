import Anchor from '@ui/anchor';
import { formattedAddress } from '@utils/getFormattedAddress';
import { getFormattedName } from '@utils/getFormattedName';
import Image from 'next/image';
import { useEffect } from 'react';
import appConfig from '../../common/configuration/app.config';

type PropsType = {
  itemsQty: number;
  colTitle: string;
  colId: string;
  ownerAddress: string;
  collectionBanner: {
    url: string;
  };
  collectionCustomBanner?: string;
  collectionThumbnail?: string;
};

const CollectionComponent = ({
  itemsQty,
  colTitle,
  colId,
  ownerAddress,
  collectionBanner,
  collectionCustomBanner = '',
  collectionThumbnail,
}: PropsType) => (
  <div className="rn-collection-inner-one">
    <div className="collection-wrapper">
      <Anchor path={`/collections/${colId}`}>
        <div className="collection-big-thumbnail">
          <img
            src={
              collectionBanner
                ? `${appConfig.imageUrl}${
                    collectionBanner.url
                  }?img-width=${507}&img-height=${339}&img-fit=${'crop'}&img-quality=${85}`
                : `${collectionCustomBanner}`
            }
            alt="Nft_Profile"
          />
        </div>

        <div className="collection-profile mb-4">
          {collectionThumbnail && (
            <img
              src={`${
                appConfig.imageUrl
              }${collectionThumbnail}?img-width=${80}&img-height=${80}&img-fit=${'crop'}&img-quality=${85}`}
              alt="Nft_Profile"
            />
          )}
        </div>

        <div className="collection-deg" style={{ marginTop: '30px' }}>
          <h6 className="title">
            <b>{getFormattedName(colTitle)}</b>
            <span style={{ marginLeft: '2px', fontSize: '12px' }}>
              ({formattedAddress(ownerAddress)})
            </span>
          </h6>
          <span className="items">{itemsQty} items</span>
        </div>
      </Anchor>
    </div>
  </div>
);

export default CollectionComponent;
