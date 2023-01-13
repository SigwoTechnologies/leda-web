import useAppSelector from '@store/hooks/useAppSelector';
import Anchor from '@ui/anchor';
import { formattedAddress } from '@utils/getFormattedAddress';
import Image from 'next/image';
import { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { EditProfileModal } from './edit-profile-modal';
import { LoginModal } from './login-modal';

export const OptionsDropdown = () => {
  const {
    isAuthenticated,
    account: { address, username },
  } = useAppSelector((state) => state.auth);
  const [visibilityModalEdit, setVisibilityModalEdit] = useState(false);

  const handleEditModalVisibility = () => setVisibilityModalEdit((prev) => !prev);

  return (
    <div className="icon-box">
      <span className="user-rd">
        <Image
          src={`/images/avatars/${isAuthenticated ? '1' : 'unknown-user'}.png`}
          alt="Images"
          layout="fixed"
          className="user-image"
          width={38}
          height={38}
        />
      </span>
      <div className="rn-dropdown">
        <div className="rn-inner-top">
          <h4 className="title" style={{ display: 'flex', alignItems: 'center' }}>
            <Anchor path="/author">{username || 'unnamed'}</Anchor>
          </h4>
          <span>({formattedAddress(address)})</span>
        </div>
        <LoginModal />

        <EditProfileModal
          visibility={visibilityModalEdit}
          handleEditModalVisibility={handleEditModalVisibility}
        />
        <ul className="list-inner">
          <li>
            <Anchor path="/author">My Profile</Anchor>
          </li>

          <li>
            <Anchor path="#" onClick={handleEditModalVisibility}>
              Edit <MdEdit style={{ cursor: 'pointer' }} />
            </Anchor>
          </li>
        </ul>
      </div>
    </div>
  );
};
