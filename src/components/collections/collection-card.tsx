/* eslint-disable @next/next/no-img-element */
import Anchor from '@ui/anchor';
import { formattedAddress } from '@utils/getFormattedAddress';
import { getFormattedName } from '@utils/getFormattedName';
import appConfig from '../../common/configuration/app.config';
import { ICollection } from '../../types/ICollection';

type Props = {
  collection: ICollection;
};

export const CollectionCard = ({ collection }: Props) => {
  const collectionBanner = collection.items[0]?.image.url;

  return (
    <div className="rn-collection-inner-one">
      <div className="collection-wrapper">
        <Anchor path={`/collections/${collection.id}`}>
          <div className="collection-big-thumbnail">
            <img
              src={
                collectionBanner
                  ? `${
                      appConfig.imageUrl
                    }${collectionBanner}?img-width=${507}&img-height=${339}&img-fit=${'crop'}&img-quality=${85}`
                  : `${'https://source.unsplash.com/random/900x600'}`
              }
              alt="collection"
            />
          </div>

          <div className="collection-profile mb-4">
            {collection.image?.url && (
              <img
                src={`${appConfig.imageUrl}${
                  collection.image?.url
                }?img-width=${80}&img-height=${80}&img-fit=${'crop'}&img-quality=${85}`}
                alt="collection_image"
              />
            )}
          </div>

          <div className="collection-deg" style={{ marginTop: '30px' }}>
            <h6 className="title">
              <b>{getFormattedName(collection.name)}</b>
              <span style={{ marginLeft: '2px', fontSize: '12px' }}>
                ({formattedAddress(collection?.owner?.address)})
              </span>
            </h6>
            <span className="items">{collection.items.length} items</span>
          </div>
        </Anchor>
      </div>
    </div>
  );
};
