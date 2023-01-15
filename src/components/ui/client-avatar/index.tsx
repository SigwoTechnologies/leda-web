import Image from 'next/image';
import Anchor from '@ui/anchor';
import { ImageType } from '../../../types/image';

type Props = {
  slug: string;
  name: string;
  image: ImageType;
};

const ClientAvatar = ({ slug, name, image }: Props) => (
  <Anchor path={slug} className="avatar" data-tooltip={name}>
    {image?.src && (
      <Image
        src={image.src}
        alt={image?.alt || name}
        layout="fixed"
        width={image?.width || 30}
        height={image?.height || 30}
      />
    )}
  </Anchor>
);

export default ClientAvatar;
